import express from 'express';
import path from 'path';
import { applicationsRouter } from './routes/applications';
import { healthRouter } from './routes/health';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use('/api/applications', applicationsRouter);
  app.use('/api/healthz', healthRouter);

  return app;
}
