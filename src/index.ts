import 'dotenv/config';
import { createApp } from './app';
import { startBot } from './bot/bot';

const PORT = parseInt(process.env.PORT || '8080', 10);

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

const app = createApp();

app.listen(PORT, () => {
  console.log(`✅ Web server running on port ${PORT}`);
});

startBot().catch((err) => {
  console.error('❌ Bot failed to start:', err);
});
