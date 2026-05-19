import { Router } from 'express';
import pool from '../db/pool';
import { discordClient, sendApplicationToDiscord } from '../bot/bot';
import { lookupDiscordUser } from '../bot/discord-lookup';
import { sendApplicationToTelegram } from '../telegram/sender';

const router = Router();

router.post('/curator', async (req, res) => {
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

  if (
    !trimmed.discord_username || trimmed.discord_username === '' ||
    !age || age === '' ||
    !trimmed.name || trimmed.name === '' ||
    !trimmed.activity || trimmed.activity === '' ||
    !trimmed.experience || trimmed.experience === '' ||
    !trimmed.motivation || trimmed.motivation === '' ||
    rules === undefined || rules === null || rules === ''
  ) {
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
