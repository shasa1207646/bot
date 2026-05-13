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
