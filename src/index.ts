import { createApp } from './app';
import { initBot } from './bot/bot';

const PORT = process.env.PORT || 8080;

// Глобальная обработка ошибок
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function start() {
  try {
    // Запуск Express сервера
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`✅ Web server running on port ${PORT}`);
    });

    // Запуск Discord бота
    await initBot();
    console.log('✅ Discord bot started');
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

start();
