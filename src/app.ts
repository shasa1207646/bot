import express from 'express';
import path from 'path';
import cors from 'cors';
import healthRouter from './routes/health';
import applicationsRouter from './routes/applications';
import curatorRouter from './routes/curator';
import moderatorRouter from './routes/moderator';
import moderatorAuthRouter from './routes/moderator-auth';
import moderatorPanelRouter from './routes/moderator-panel';
import discordLookupRouter from './routes/discord-lookup';
import authRouter from './routes/auth';
import internalRouter from './routes/internal';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Статика
app.use(express.static(path.join(process.cwd(), 'public')));

// API роуты
app.use('/api', healthRouter);
app.use('/api', applicationsRouter);
app.use('/api', curatorRouter);
app.use('/api', moderatorRouter);
app.use('/api', moderatorAuthRouter);
app.use('/api', moderatorPanelRouter);
app.use('/api', discordLookupRouter);
app.use('/api', authRouter);
app.use('/api', internalRouter);

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default app;
