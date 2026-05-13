import { Router } from 'express';
import axios from 'axios';
import crypto from 'crypto';
import pool from '../db/pool';

const router = Router();

router.get('/auth/discord', async (req, res) => {
  const telegramId = req.query.telegram_id as string;
  if (!telegramId) return res.status(400).send('Нужен telegram_id');

  const state = crypto.randomBytes(32).toString('hex');
  try {
    await pool.query(
      `INSERT INTO oauth_states (state, telegram_user_id, created_at) VALUES ($1, $2, NOW())`,
      [state, telegramId]
    );
    await pool.query(`DELETE FROM oauth_states WHERE created_at < NOW() - INTERVAL '10 minutes'`);
  } catch (err) {
    return res.status(500).send('Ошибка базы данных');
  }

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state,
  });
  res.redirect(`https://discord.com/oauth2/authorize?${params}`);
});

router.get('/auth/discord/callback', async (req, res) => {
  const { code, state } = req.query as { code: string; state: string };
  if (!code || !state) return res.status(400).send('Неверный запрос');

  let stateRow: any;
  try {
    const r = await pool.query(
      `SELECT * FROM oauth_states WHERE state=$1 AND created_at > NOW()-INTERVAL '10 minutes'`,
      [state]
    );
    stateRow = r.rows[0];
  } catch { return res.status(500).send('Ошибка БД'); }

  if (!stateRow) return res.status(400).send('Ссылка устарела. Запросите новую через /auth в боте.');
  const telegramUserId = stateRow.telegram_user_id;
  await pool.query(`DELETE FROM oauth_states WHERE state=$1`, [state]);

  try {
    const tokenRes = await axios.post('https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const { access_token } = tokenRes.data;

    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const discordUser = userRes.data;

    let roles: string[] = [];
    let isModerator = false;

    // ИСПРАВЛЕНИЕ 1: все названия ролей модератора — в нижнем регистре для корректного сравнения
    const modRoles = [
      '《модератор》',
      'администрация сервера',
      'зам.главы',
      'тех-админ',
      'mod',
      'owner',
      'staff',
      'модератор',
      'администратор',
      'admin',
    ];

    try {
      const { discordClient } = await import('../bot/bot');

      // ИСПРАВЛЕНИЕ 2: ждём готовности бота до 5 секунд, не пропускаем молча
      if (!discordClient.isReady()) {
        console.warn('[Auth] Discord бот не готов, ждём...');
        await new Promise<void>((resolve) => {
          const timeout = setTimeout(resolve, 5000);
          discordClient.once('ready', () => { clearTimeout(timeout); resolve(); });
        });
      }

      if (discordClient.isReady()) {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID!);
        // ИСПРАВЛЕНИЕ 3: принудительно обновляем участника, а не берём из кэша
        const member = await guild.members.fetch({ user: discordUser.id, force: true });
        roles = member.roles.cache
          .filter(r => r.name !== '@everyone')
          .map(r => r.name);

        // ИСПРАВЛЕНИЕ 4: сравниваем обе стороны в нижнем регистре
        isModerator = roles.some(roleName =>
          modRoles.some(mr => roleName.toLowerCase().includes(mr))
        );

        console.log(`[Auth] Пользователь ${discordUser.username}, роли: [${roles.join(', ')}], модератор: ${isModerator}`);
      } else {
        console.error('[Auth] Discord бот так и не стал готов, роли не проверены');
      }
    } catch (e) {
      console.warn('[Auth] Ошибка получения ролей:', e);
    }

    const expiresAt = new Date(Date.now() + 7*24*60*60*1000);
    await pool.query(
      `INSERT INTO moderator_sessions
         (telegram_user_id,discord_user_id,discord_username,discord_roles,is_moderator,authorized_at,expires_at)
       VALUES($1,$2,$3,$4,$5,NOW(),$6)
       ON CONFLICT(telegram_user_id) DO UPDATE SET
         discord_user_id=$2,discord_username=$3,discord_roles=$4,
         is_moderator=$5,authorized_at=NOW(),expires_at=$6`,
      [telegramUserId, discordUser.id, '@'+discordUser.username, roles, isModerator, expiresAt]
    );

    // Уведомить BotHost об обновлении сессии
    const bothostSession = process.env.BOTHOST_WEBHOOK_URL?.replace('/bot/application','/bot/session');
    if (bothostSession) {
      axios.post(bothostSession, {
        telegram_user_id: telegramUserId,
        discord_user_id: discordUser.id,
        discord_username: '@'+discordUser.username,
        discord_roles: roles,
        is_moderator: isModerator,
      }, { headers: {'x-internal-secret': process.env.INTERNAL_SECRET||''}, timeout:5000 })
        .catch(e => console.warn('[Auth] BotHost session notify failed:', e?.message));
    }

    const icon = isModerator ? '✅' : '⚠️';
    const statusMsg = isModerator
      ? `Вы вошли как <strong>@${discordUser.username}</strong>.<br>🛡️ Статус модератора подтверждён.`
      : `Вы вошли как <strong>@${discordUser.username}</strong>.<br>⚠️ Роль модератора не найдена.`;

    res.send(`<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Авторизация</title>
<style>body{font-family:sans-serif;background:#0a0a0f;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:#12121a;border:1px solid #2a2a3a;border-radius:16px;padding:2.5rem 2rem;text-align:center;max-width:420px;width:90%}
h2{color:${isModerator?'#00ff88':'#ffaa00'};margin-bottom:1rem}p{color:#8892a0;line-height:1.6}strong{color:#e2e8f0}
.hint{margin-top:1.5rem;font-size:.85rem;color:#555}
.roles{margin-top:1rem;font-size:.8rem;color:#666;word-break:break-word}</style></head>
<body><div class="card"><h2>${icon} Авторизация завершена</h2><p>${statusMsg}</p>
${roles.length > 0 ? `<p class="roles">Роли на сервере: ${roles.join(', ')}</p>` : ''}
<p class="hint">Можете закрыть это окно и вернуться в Telegram.</p></div></body></html>`);

  } catch (err: any) {
    console.error('[Auth] OAuth error:', err?.message);
    res.status(500).send('Ошибка авторизации. Напишите /auth в боте и попробуйте снова.');
  }
});

export default router;
