🎮 GameVerse — Discord + Telegram Bot + Website
Полноценный проект: сайт с заявками, Discord-бот, Telegram-бот для администрации.
🏗 Архитектура
```
Railway (сайт + Discord бот)
  ↕ webhook POST /bot/application
BotHost (Telegram бот)
  ↕ POST /api/internal/decision
Railway (обрабатывает решение)
```
📁 Структура
```
project/
├── src/                    ← Railway (Express + Discord)
│   ├── index.ts
│   ├── app.ts
│   ├── db/
│   │   ├── pool.ts
│   │   └── migrations.ts
│   ├── bot/
│   │   ├── bot.ts
│   │   ├── commands.ts
│   │   ├── badwords.ts
│   │   ├── register-commands.ts
│   │   └── discord-lookup.ts
│   ├── telegram/
│   │   └── sender.ts
│   ├── ai/
│   │   └── chat.ts
│   └── routes/
│       ├── applications.ts
│       ├── curator.ts
│       ├── health.ts
│       ├── discord-lookup.ts
│       ├── auth.ts
│       └── internal.ts
├── bothost/                ← BotHost (Telegram бот)
│   ├── src/index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── railway.json
└── .env.example
```
---
🚀 Деплой — Railway
1. Создать проект на Railway
Зайдите на railway.app
New Project → Deploy from GitHub repo
Подключите репозиторий
2. Добавить PostgreSQL
В Railway UI: New → Database → PostgreSQL
Railway автоматически добавит `DATABASE_URL` в env вашего сервиса.
3. Переменные окружения Railway
В Settings → Variables добавьте:
```
DISCORD_BOT_TOKEN=         токен вашего Discord-бота
DISCORD_GUILD_ID=          ID сервера Discord (правая кнопка на сервере → Copy ID)
DISCORD_CHANNEL_ID=        ID канала для заявок
DISCORD_VOICE_CHANNEL_ID=  ID голосового канала ожидания
DISCORD_CLIENT_ID=         Client ID (discord.com/developers → ваше приложение)
DISCORD_CLIENT_SECRET=     Client Secret
DISCORD_REDIRECT_URI=      https://ВАШ_ДОМЕН.railway.app/api/auth/discord/callback
TELEGRAM_BOT_TOKEN=        токен от @BotFather
BOTHOST_WEBHOOK_URL=        https://ВАШ_BOTHOST_URL/bot/application
OPENAI_API_KEY=             ключ от OpenAI
SESSION_SECRET=             случайная строка 32+ символа
INTERNAL_SECRET=            общий секрет Railway ↔ BotHost (любая строка)
PORT=                       8080
```
4. Discord OAuth2 настройка
Перейдите на discord.com/developers/applications
Выберите ваше приложение → OAuth2 → Redirects
Добавьте: `https://ВАШ_ДОМЕН.railway.app/api/auth/discord/callback`
Scopes: `identify`, `guilds.members.read`
5. Build & Start команды Railway
Build: `npm run build`
Start: `node dist/index.js`
---
🤖 Деплой — BotHost
1. Загрузить папку `bothost/`
Загрузите содержимое папки `bothost/` на BotHost как отдельный проект.
2. Переменные окружения BotHost
```
TELEGRAM_BOT_TOKEN=        тот же токен что и на Railway
TELEGRAM_ADMIN_CHAT_ID=    ID группы/канала администраторов в Telegram
                           (добавьте бота в группу, напишите /start, получите chat ID)
RAILWAY_CALLBACK_URL=      https://ВАШ_ДОМЕН.railway.app/api/internal/decision
RAILWAY_AUTH_URL=          https://ВАШ_ДОМЕН.railway.app/api/auth/discord
INTERNAL_SECRET=           тот же секрет что на Railway
PORT=                      3000
```
3. Команды BotHost
Build: `npm run build`
Start: `node dist/index.js`
4. Получить TELEGRAM_ADMIN_CHAT_ID
Создайте группу в Telegram
Добавьте бота в группу
Напишите `/start` в группе
Или используйте @userinfobot — перешлите любое сообщение из группы
---
🔗 После деплоя — связать Railway и BotHost
После получения доменов обновите переменные:
На Railway:
```
BOTHOST_WEBHOOK_URL = https://ВАШ_BOTHOST.bothost.io/bot/application
```
На BotHost:
```
RAILWAY_CALLBACK_URL = https://ВАШ_ДОМЕН.railway.app/api/internal/decision
RAILWAY_AUTH_URL     = https://ВАШ_ДОМЕН.railway.app/api/auth/discord
```
---
👮 Авторизация модераторов в Telegram
Модератор пишет `/auth` в Telegram-бот
Бот присылает ссылку «Войти через Discord»
Модератор авторизуется → Railway проверяет роль на сервере
Если роль Модератор/Admin/Администратор найдена — доступ открыт
Сессия действует 7 дней, потом нужно повторить `/auth`
⚠️ Без авторизации кнопки ✅/❌ на заявках будут заблокированы.
---
🌐 Сайт — вкладки
Вкладка	Описание
🏠 Главная	Презентация сервера
📋 Вступить	Заявка с проверкой @ника на сервере
👑 Куратор	Заявка на роль куратора
🤖 AI	Чат с GPT-4o-mini
⚔️ Команды	Список slash-команд
ℹ️ О сервере	Инструкции + Google Apps Script
Темы оформления: Игровая 🎮 | Аниме 🌸 | Sci-Fi 🚀 | Минимализм 🌑
---
❓ Частые вопросы
Q: Бот не находит пользователя по @нику
A: Убедитесь, что бот имеет intent `GuildMembers` в Discord Developer Portal.
Включите: Bot → Privileged Gateway Intents → Server Members Intent.
Q: Telegram-бот не получает заявки
A: Проверьте `BOTHOST_WEBHOOK_URL` на Railway и `INTERNAL_SECRET` на обоих серверах.
Q: Кнопки ✅/❌ заблокированы
A: Модератор должен выполнить `/auth` в Telegram-боте и пройти авторизацию Discord.
Q: OpenAI не работает
A: Проверьте `OPENAI_API_KEY` и баланс на platform.openai.com.
---
📦 Технологии
Компонент	Технология
Сервер	Node.js + TypeScript + Express 4
Discord	discord.js v14
Telegram	node-telegram-bot-api
База данных	PostgreSQL (Railway addon)
AI	OpenAI GPT-4o-mini
Сборка	esbuild
Хостинг 1	Railway (сайт + Discord)
Хостинг 2	BotHost (Telegram)
