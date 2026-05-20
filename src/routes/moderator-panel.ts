import { Router, Request, Response, NextFunction } from 'express';
import pool from '../db/pool';
import { discordClient } from '../bot/bot';
import { ColorResolvable } from 'discord.js';

const router = Router();

// ─── Middleware: проверка сессии модератора ────────────────────────────────────
async function requireModerator(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers['x-mod-session'] as string;

  if (!sessionId) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM web_mod_sessions WHERE id=$1 AND expires_at > NOW()`,
      [sessionId]
    );
    const session = result.rows[0];

    if (!session) {
      return res.status(401).json({ error: 'Сессия истекла. Авторизуйтесь снова.' });
    }

    if (!session.is_moderator) {
      return res.status(403).json({ error: 'Недостаточно прав. Требуется роль модератора.' });
    }

    (req as any).modSession = session;
    next();
  } catch (err) {
    console.error('[ModPanel] Ошибка проверки сессии:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

// ─── GET /api/moderator/applications ─────────────────────────────────────────
// Все заявки с пагинацией и фильтрацией
router.get('/moderator/applications', requireModerator, async (req: Request, res: Response) => {
  const page   = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit  = Math.min(50, parseInt(req.query.limit as string) || 20);
  const offset = (page - 1) * limit;
  const status = req.query.status as string || 'all';
  const type   = req.query.type as string || 'all';

  try {
    const conditions: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (status !== 'all') {
      conditions.push(`status = $${idx++}`);
      params.push(status);
    }
    if (type !== 'all') {
      conditions.push(`type = $${idx++}`);
      params.push(type);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRes = await pool.query(
      `SELECT COUNT(*) FROM applications ${where}`,
      params
    );
    const total = parseInt(countRes.rows[0].count);

    const dataRes = await pool.query(
      `SELECT * FROM applications ${where} ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx++}`,
      [...params, limit, offset]
    );

    res.json({
      applications: dataRes.rows,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('[ModPanel] Ошибка получения заявок:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── GET /api/moderator/mutes ─────────────────────────────────────────────────
// Все муты с пагинацией
router.get('/moderator/mutes', requireModerator, async (req: Request, res: Response) => {
  const page   = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit  = Math.min(50, parseInt(req.query.limit as string) || 20);
  const offset = (page - 1) * limit;

  try {
    const countRes = await pool.query(`SELECT COUNT(*) FROM mutes`);
    const total = parseInt(countRes.rows[0].count);

    const dataRes = await pool.query(
      `SELECT * FROM mutes ORDER BY muted_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      mutes: dataRes.rows,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('[ModPanel] Ошибка получения мутов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── GET /api/moderator/bans ──────────────────────────────────────────────────
// Все баны с пагинацией
router.get('/moderator/bans', requireModerator, async (req: Request, res: Response) => {
  const page   = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit  = Math.min(50, parseInt(req.query.limit as string) || 20);
  const offset = (page - 1) * limit;

  try {
    const countRes = await pool.query(`SELECT COUNT(*) FROM bans`);
    const total = parseInt(countRes.rows[0].count);

    const dataRes = await pool.query(
      `SELECT * FROM bans ORDER BY banned_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      bans: dataRes.rows,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('[ModPanel] Ошибка получения банов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── POST /api/moderator/application/:id/approve ─────────────────────────────
// Одобрить заявку
router.post('/moderator/application/:id/approve', requireModerator, async (req: Request, res: Response) => {
  const appId = parseInt(req.params.id);
  const session = (req as any).modSession;

  if (isNaN(appId)) {
    return res.status(400).json({ error: 'Неверный ID заявки' });
  }

  try {
    const result = await pool.query('SELECT * FROM applications WHERE id=$1', [appId]);
    const app = result.rows[0];

    if (!app) return res.status(404).json({ error: 'Заявка не найдена' });
    if (app.status !== 'pending') return res.status(409).json({ error: 'Заявка уже обработана' });

    // Выдаём роль в Discord
    if (discordClient.isReady() && app.discord_id) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        let role = guild.roles.cache.find(r => r.name === 'Обзвон');
        if (!role) {
          role = await guild.roles.create({ name: 'Обзвон', color: '#57f287' as ColorResolvable });
        }
        const member = await guild.members.fetch(app.discord_id);
        await member.roles.add(role);
        const voiceLink = process.env.DISCORD_VOICE_CHANNEL_ID
          ? `https://discord.com/channels/${guild.id}/${process.env.DISCORD_VOICE_CHANNEL_ID}`
          : '';
        await member.send(
          `✅ Ваша заявка одобрена!\nДобро пожаловать на сервер 🎮${voiceLink ? `\n🎙️ Голосовой канал ожидания: ${voiceLink}` : ''}`
        );
      } catch (e) {
        console.warn('[ModPanel] Ошибка Discord при одобрении:', e);
      }
    }

    await pool.query(
      `UPDATE applications SET status='approved', decided_by=$1 WHERE id=$2`,
      [session.discord_username, appId]
    );

    res.json({ success: true, message: 'Заявка одобрена' });
  } catch (err) {
    console.error('[ModPanel] Ошибка одобрения заявки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── POST /api/moderator/application/:id/reject ───────────────────────────────
// Отклонить заявку
router.post('/moderator/application/:id/reject', requireModerator, async (req: Request, res: Response) => {
  const appId = parseInt(req.params.id);
  const session = (req as any).modSession;
  const { reason } = req.body;

  if (isNaN(appId)) {
    return res.status(400).json({ error: 'Неверный ID заявки' });
  }

  try {
    const result = await pool.query('SELECT * FROM applications WHERE id=$1', [appId]);
    const app = result.rows[0];

    if (!app) return res.status(404).json({ error: 'Заявка не найдена' });
    if (app.status !== 'pending') return res.status(409).json({ error: 'Заявка уже обработана' });

    // Уведомляем пользователя в Discord
    if (discordClient.isReady() && app.discord_id) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        const member = await guild.members.fetch(app.discord_id);
        const reasonText = reason ? `\nПричина: ${reason}` : '';
        await member.send(`❌ Ваша заявка отклонена.${reasonText}\nВы можете подать её повторно через некоторое время.`);
      } catch (e) {
        console.warn('[ModPanel] Ошибка Discord при отклонении:', e);
      }
    }

    await pool.query(
      `UPDATE applications SET status='rejected', decided_by=$1 WHERE id=$2`,
      [session.discord_username, appId]
    );

    res.json({ success: true, message: 'Заявка отклонена' });
  } catch (err) {
    console.error('[ModPanel] Ошибка отклонения заявки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── DELETE /api/moderator/mute/:id ──────────────────────────────────────────
// Удалить мут
router.delete('/moderator/mute/:id', requireModerator, async (req: Request, res: Response) => {
  const muteId = parseInt(req.params.id);

  if (isNaN(muteId)) {
    return res.status(400).json({ error: 'Неверный ID мута' });
  }

  try {
    const result = await pool.query('DELETE FROM mutes WHERE id=$1 RETURNING *', [muteId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Мут не найден' });
    }

    // Снимаем тайм-аут в Discord если пользователь там
    const mute = result.rows[0];
    if (discordClient.isReady() && mute.user_id) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        const member = await guild.members.fetch(mute.user_id).catch(() => null);
        if (member && member.communicationDisabledUntil) {
          await member.disableCommunicationUntil(null, 'Мут снят через панель модератора');
        }
      } catch (e) {
        console.warn('[ModPanel] Ошибка снятия мута в Discord:', e);
      }
    }

    res.json({ success: true, message: 'Мут удалён' });
  } catch (err) {
    console.error('[ModPanel] Ошибка удаления мута:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── DELETE /api/moderator/ban/:id ───────────────────────────────────────────
// Удалить бан
router.delete('/moderator/ban/:id', requireModerator, async (req: Request, res: Response) => {
  const banId = parseInt(req.params.id);

  if (isNaN(banId)) {
    return res.status(400).json({ error: 'Неверный ID бана' });
  }

  try {
    const result = await pool.query('DELETE FROM bans WHERE id=$1 RETURNING *', [banId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Бан не найден' });
    }

    // Разбаниваем в Discord
    const ban = result.rows[0];
    if (discordClient.isReady() && ban.user_id) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        await guild.bans.remove(ban.user_id, 'Бан снят через панель модератора').catch(() => null);
      } catch (e) {
        console.warn('[ModPanel] Ошибка снятия бана в Discord:', e);
      }
    }

    res.json({ success: true, message: 'Бан удалён' });
  } catch (err) {
    console.error('[ModPanel] Ошибка удаления бана:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;

// ─── GET /api/moderator/chat-messages ────────────────────────────────────────
// Получить последние сообщения из основного чата Discord
router.get('/moderator/chat-messages', requireModerator, async (req: Request, res: Response) => {
  const channelId = (req.query.channel_id as string) || process.env.DISCORD_MAIN_CHAT_CHANNEL_ID || process.env.DISCORD_CHANNEL_ID;
  const limit = Math.min(50, parseInt(req.query.limit as string) || 30);

  if (!channelId) {
    return res.status(400).json({ error: 'Не задан ID канала. Укажите DISCORD_MAIN_CHAT_CHANNEL_ID.' });
  }

  try {
    if (!discordClient.isReady()) {
      return res.status(503).json({ error: 'Discord бот не готов' });
    }

    const channel = await discordClient.channels.fetch(channelId) as any;
    if (!channel || !channel.messages) {
      return res.status(404).json({ error: 'Канал не найден или недоступен' });
    }

    const messages = await channel.messages.fetch({ limit });
    const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);

    // Проверяем у каждого автора наличие Telegram (через БД)
    const authorIds = [...new Set([...messages.values()].map((m: any) => m.author.id))];

    // Ищем пользователей с Telegram (авторизованных через OAuth)
    let usersWithTelegram = new Set<string>();
    try {
      const tgCheck = await pool.query(
        `SELECT discord_id FROM web_mod_sessions WHERE discord_id = ANY($1::text[]) AND expires_at > NOW()`,
        [authorIds]
      );
      tgCheck.rows.forEach((r: any) => usersWithTelegram.add(r.discord_id));
    } catch {}

    const result = [...messages.values()].map((msg: any) => {
      const member = guild.members.cache.get(msg.author.id);
      const hasTelegram = usersWithTelegram.has(msg.author.id);
      return {
        id: msg.id,
        content: msg.content || (msg.attachments.size > 0 ? '[Вложение]' : '[Пустое сообщение]'),
        author_id: msg.author.id,
        author_name: msg.author.username,
        author_discriminator: msg.author.discriminator,
        author_avatar: msg.author.displayAvatarURL({ size: 64 }),
        author_nickname: member?.nickname || null,
        created_at: msg.createdAt.toISOString(),
        has_telegram: hasTelegram,
        attachments: msg.attachments.size,
        roles: member?.roles.cache
          .filter((r: any) => r.name !== '@everyone')
          .map((r: any) => r.name) || [],
      };
    });

    res.json({ messages: result, channel_id: channelId, channel_name: channel.name });
  } catch (err) {
    console.error('[ModPanel] Ошибка получения сообщений:', err);
    res.status(500).json({ error: 'Ошибка получения сообщений из Discord' });
  }
});

// ─── GET /api/moderator/channels ─────────────────────────────────────────────
// Список текстовых каналов гильдии
router.get('/moderator/channels', requireModerator, async (_req: Request, res: Response) => {
  try {
    if (!discordClient.isReady()) {
      return res.status(503).json({ error: 'Discord бот не готов' });
    }
    const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
    await guild.channels.fetch();
    const channels = guild.channels.cache
      .filter((c: any) => c.type === 0) // GUILD_TEXT = 0
      .map((c: any) => ({ id: c.id, name: c.name }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    res.json({ channels });
  } catch (err) {
    console.error('[ModPanel] Ошибка получения каналов:', err);
    res.status(500).json({ error: 'Ошибка получения каналов' });
  }
});

// ─── POST /api/moderator/mute ─────────────────────────────────────────────────
// Выдать мут пользователю
router.post('/moderator/mute', requireModerator, async (req: Request, res: Response) => {
  const session = (req as any).modSession;
  const { user_id, username, reason, duration_minutes } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'Укажите user_id' });
  }

  try {
    const durationMs = duration_minutes ? parseInt(duration_minutes) * 60 * 1000 : null;
    const expiresAt = durationMs ? new Date(Date.now() + durationMs) : null;

    // Сохраняем в БД
    await pool.query(
      `INSERT INTO mutes (user_id, username, reason, muted_by, expires_at) VALUES ($1, $2, $3, $4, $5)`,
      [user_id, username || user_id, reason || null, session.discord_username, expiresAt]
    );

    // Применяем тайм-аут в Discord
    if (discordClient.isReady() && durationMs) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        const member = await guild.members.fetch(user_id).catch(() => null);
        if (member) {
          const until = new Date(Date.now() + Math.min(durationMs, 28 * 24 * 60 * 60 * 1000));
          await member.disableCommunicationUntil(until, reason || 'Мут через панель модератора');
        }
      } catch (e) {
        console.warn('[ModPanel] Ошибка применения мута в Discord:', e);
      }
    }

    res.json({ success: true, message: `Мут выдан пользователю ${username || user_id}` });
  } catch (err) {
    console.error('[ModPanel] Ошибка выдачи мута:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── POST /api/moderator/ban ──────────────────────────────────────────────────
// Забанить пользователя
router.post('/moderator/ban', requireModerator, async (req: Request, res: Response) => {
  const session = (req as any).modSession;
  const { user_id, username, reason } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'Укажите user_id' });
  }

  try {
    // Сохраняем в БД
    await pool.query(
      `INSERT INTO bans (user_id, username, reason, banned_by) VALUES ($1, $2, $3, $4)`,
      [user_id, username || user_id, reason || null, session.discord_username]
    );

    // Баним в Discord
    if (discordClient.isReady()) {
      try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        await guild.bans.create(user_id, { reason: reason || 'Бан через панель модератора', deleteMessageSeconds: 86400 });
      } catch (e) {
        console.warn('[ModPanel] Ошибка применения бана в Discord:', e);
      }
    }

    res.json({ success: true, message: `Пользователь ${username || user_id} забанен` });
  } catch (err) {
    console.error('[ModPanel] Ошибка выдачи бана:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
