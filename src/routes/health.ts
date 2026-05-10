import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/healthz', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
