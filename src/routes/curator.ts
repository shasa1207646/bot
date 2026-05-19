import { Router } from 'express';
import pool from '../db/pool';
import { discordClient, sendApplicationToDiscord } from '../bot/bot';
import { lookupDiscordUser } from '../bot/discord-lookup';
import { sendApplicationToTelegram } from '../telegram/sender';

const router = Router();

router.post('/curator', async (req, res) => {
  console.log('[Curator] Received body:', req.body);

  const {
    discord_username,
    age,
    name,
    activity,
    games,
    rules,
    experience,
    motivation,
  } = req.body;

  const trimmed = {
    discord_username: typeof discord_username === 'string' ? discord_username.trim() : discord_username,
    name: typeof name === 'string' ? name.trim() : name,
    activity: typeof activity === 'string' ? activity.trim() : activity,
    experience: typeof experience === 'string' ? experience.trim() : experience,
    motivation: typeof motivation === 'string' ? motivation.trim() : motivation,
  };

  console.log('[Curator] Trimmed values:', trimmed);

  const missingFields: string[] = [];
  if (!trimmed.discord_username || trimmed.discord_username === '') missingFields.push('discord_username');
  if (!age || age === '') missingFields.push('age');
  if (!trimmed.name || trimmed.name === '') missingFields.push('name');
  if (!trimmed.activity || trimmed.activity === '') missingFields.push('activity');
  if (!trimmed.experience || trimmed.experience === '') missingFields.push('experience');
  if (!trimmed.motivation || trimmed.motivation === '') missingFields.push('motivation');
  if (rules === undefined || rules === null || rules === '') missingFields.push('rules');

  if (missingFields.length > 0) {
    console.log('[Curator] Validation failed — missing or empty fields:', missingFields);
    return res.status(400).json({ error: 'Заполните все обязательные поля.' });
  }

  if (rules === false || rules === 'false' || rules === 'Нет') {
    return res.status(400).json({ error: 'Вы должны принять правила сервера.' });
  }

  let discordData: any = { found: false };
  if (discordClient.isReady()) {
    discordData = await lookupDiscordUser(discordClient, trimmed.discord_username);
  }

  if (!discordData.found) {
    return res.status(404).json({ error: `Пользователь ${trimmed.discord_username} не найден на сервере Discord.` });
  }

  const trimmedGames = typeof games === 'string' ? games.trim() || null : games || null;

  const result = await pool.query(
    `INSERT INTO applications (type, discord_id, username, age, name, activity, games, rules, experience, motivation)
     VALUES ('curator', $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [
      discordData.discord_id,
      discordData.username,
      parseInt(age),
      trimmed.name,
      trimmed.activity,
      trimmedGames,
      true,
      trimmed.experience,
      trimmed.motivation,
    ]
  );

  const appId = result.rows[0].id;

  const appData = {
    id: appId,
    type: 'curator',
    discord_id: discordData.discord_id,
    username: discordData.username,
    age: parseInt(age),
    name: trimmed.name,
    activity: trimmed.activity,
    games: trimmedGames,
    rules: true,
    experience: trimmed.experience,
    motivation: trimmed.motivation,
    discord_avatar: discordData.avatar,
    discord_roles: discordData.roles?.map((r: any) => r.name) || [],
    submitted_at: new Date().toISOString(),
  };

  await sendApplicationToDiscord(appData);
  await sendApplicationToTelegram(appData);

  res.json({ success: true, message: 'Заявка на куратора отправлена!' });
});

export default router;
