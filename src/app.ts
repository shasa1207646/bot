import express from 'express';
import path from 'path';
import { applicationsRouter } from './routes/applications';
import { healthRouter } from './routes/health';

export function createApp() {
  const app = express();
  
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Routes
  app.use('/api', applicationsRouter);
  app.use('/api', healthRouter);
  
  return app;
}
