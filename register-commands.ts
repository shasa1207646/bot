import 'dotenv/config';
import app from './app';
import { startDiscordBot } from './bot/bot';
import { registerCommands } from './bot/register-commands';
import { runMigrations } from './db/migrations';

process.on('uncaughtException', (err) => {
  console.error('[Railway] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Railway] Unhandled Rejection:', reason);
});

const PORT = parseInt(process.env.PORT || '8080', 10);

async function main() {
  // 1. Запустить БД миграции
  try {
    await runMigrations();
  } catch (err) {
    console.error('[Main] Ошибка миграций:', err);
  }

  // 2. Запустить Discord бот
  startDiscordBot();

  // 3. Зарегистрировать команды
  setTimeout(() => {
    registerCommands().catch(console.error);
  }, 3000);

  // 4. Запустить Express
  app.listen(PORT, () => {
    console.log(`[Railway] Сервер запущен на порту ${PORT}`);
  });
}

main();
