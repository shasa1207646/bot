import { Router } from 'express';
import pool from '../db/pool';
import { discordClient, sendApplicationToDiscord } from '../bot/bot';
import { lookupDiscordUser } from '../bot/discord-lookup';
import { sendApplicationToTelegram } from '../telegram/sender';

const router = Router();

router.post('/moderator', async (req, res) => {
  const { discord_username, age, name, activity, timezone, experience, situation, motivation, nitro, rules } = req.body;

  if (!discord_username || !age || !name || !activity || !timezone || !experience || !situation || !motivation || rules === undefined) {
    return res.status(400).json({ error: 'Заполните все обязательные поля.' });
  }
  if (!rules) {
    return res.status(400).json({ error: 'Вы должны принять правила модератора.' });
  }

  let discordData: any = { found: false };
  if (discordClient.isReady()) {
    discordData = await lookupDiscordUser(discordClient, discord_username);
  }
  if (!discordData.found) {
    return res.status(404).json({ error: `Пользователь ${discord_username} не найден на сервере Discord.` });
  }

  const result = await pool.query(
    `INSERT INTO applications
       (type, discord_id, username, age, name, activity, rules, experience, motivation)
     VALUES ('moderator', $1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      discordData.discord_id,
      discordData.username,
      parseInt(age),
      name,
      activity,
      true,
      // Склеиваем доп. поля в experience
      `Часовой пояс: ${timezone}\nОпыт: ${experience}\nСитуация: ${situation}\nNitro: ${nitro}`,
      motivation,
    ]
  );

  const appId = result.rows[0].id;
  const appData = {
    id: appId,
    type: 'moderator',
    discord_id: discordData.discord_id,
    username: discordData.username,
    age: parseInt(age),
    name,
    activity,
    rules: true,
    experience: `Часовой пояс: ${timezone}\n\nОпыт модерации:\n${experience}\n\nСитуация с нарушителем:\n${situation}\n\nNitro/Буст: ${nitro}`,
    motivation,
    discord_avatar: discordData.avatar,
    discord_roles: discordData.roles?.map((r: any) => r.name) || [],
    submitted_at: new Date().toISOString(),
  };

  await sendApplicationToDiscord(appData);
  await sendApplicationToTelegram(appData);

  res.json({ success: true, message: 'Заявка на модератора отправлена!' });
});

export default router;
