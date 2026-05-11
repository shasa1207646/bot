import { Router } from 'express';
import { discordClient } from '../bot/bot';

const router = Router();

router.get('/healthz', (_req, res) => {
  res.json({
    status: 'ok',
    discord: discordClient.isReady() ? 'online' : 'offline',
    timestamp: new Date().toISOString(),
  });
});

export default router;
