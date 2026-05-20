import { Router } from 'express';
import pool from '../db/pool';
import { discordClient, sendApplicationToDiscord } from '../bot/bot';
import { lookupDiscordUser } from '../bot/discord-lookup';
import { sendApplicationToTelegram } from '../telegram/sender';

const router = Router();

// Rate limiting (простой in-memory)
const rateMap = new Map<string, number[]>();
function rateLimit(ip: string, max = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter(t => now - t < windowMs);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length <= max;
}

router.post('/applications', async (req, res) => {
  const ip = req.ip || 'unknown';
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Слишком много запросов. Подождите минуту.' });
  }

  const { discord_username, age, name, activity, games, rules } = req.body;

  if (!discord_username || !age || !name || !activity || rules === undefined) {
    return res.status(400).json({ error: 'Заполните все обязательные поля.' });
  }

  if (rules === false || rules === 'false' || rules === 'Нет') {
    return res.status(400).json({ error: 'Вы должны принять правила сервера.' });
  }

  // Найти пользователя в Discord
  let discordData: any = { found: false };
  if (discordClient.isReady()) {
    discordData = await lookupDiscordUser(discordClient, discord_username);
  }

  if (!discordData.found) {
    return res.status(404).json({ error: `Пользователь ${discord_username} не найден на сервере Discord.` });
  }

  const result = await pool.query(
    `INSERT INTO applications (type, discord_id, username, age, name, activity, games, rules)
     VALUES ('member', $1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      discordData.discord_id,
      discordData.username,
      parseInt(age),
      name,
      activity,
      games || null,
      rules === true || rules === 'true' || rules === 'Да, принимаю',
    ]
  );

  const appId = result.rows[0].id;

  const appData = {
    id: appId,
    type: 'member',
    discord_id: discordData.discord_id,
    username: discordData.username,
    age: parseInt(age),
    name,
    activity,
    games: games || null,
    rules: true,
    discord_avatar: discordData.avatar,
    discord_roles: discordData.roles?.map((r: any) => r.name) || [],
    submitted_at: new Date().toISOString(),
  };

  // Отправить в Discord
  await sendApplicationToDiscord(appData);

  // Отправить в Telegram (BotHost)
  await sendApplicationToTelegram(appData);

  res.json({ success: true, message: 'Заявка успешно отправлена!' });
});

export default router;
