import { Router } from 'express';
import { discordClient } from '../bot/bot';
import { lookupDiscordUser } from '../bot/discord-lookup';

const router = Router();

router.get('/discord/lookup', async (req, res) => {
  const username = (req.query.username as string || '').trim();
  if (!username) {
    return res.status(400).json({ error: 'Укажите username' });
  }

  if (!discordClient.isReady()) {
    return res.status(503).json({ error: 'Discord бот недоступен' });
  }

  const result = await lookupDiscordUser(discordClient, username);
  res.json(result);
});

export default router;
