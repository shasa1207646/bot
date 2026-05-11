# Discord Bot 🤖

Discord-бот на Node.js + TypeScript с веб-панелью.

## Стек
- **discord.js v14** — бот
- **Express 5** — веб-сервер
- **TypeScript + esbuild** — сборка

## Быстрый старт

### 1. Клонировать и установить зависимости
```bash
git clone <your-repo>
cd discord-bot
npm install
```

### 2. Настроить переменные окружения
```bash
cp .env.example .env
```
Отредактируй `.env`:
```
DISCORD_BOT_TOKEN=токен_бота
DISCORD_GUILD_ID=ID_сервера
DISCORD_CHANNEL_ID=ID_канала_для_заявок
DISCORD_VOICE_CHANNEL_ID=ID_голосового_канала
PORT=8080
```

### 3. Собрать и запустить
```bash
npm run build
npm start
```

## Команды бота
| Команда | Описание |
|---------|----------|
| `/help` | Список команд |
| `/ban <user> [reason]` | Бан пользователя |
| `/kick <user> [reason]` | Кик пользователя |
| `/create-role <name> [color]` | Создать роль |
| `/action <user> give_role <role>` | Выдать роль |
| `/action <user> send_message <text>` | Отправить ЛС |

## Деплой (Railway / Render)
- **Build command:** `npm run build`
- **Start command:** `node dist/index.js`
- Тип: **Always-on** (не serverless — нужен WebSocket Discord)

## API Endpoints
- `POST /api/applications` — приём заявок
- `GET /api/healthz` — проверка работы сервера

## Google Forms
Инструкция по подключению Google Forms — во вкладке **"О боте"** на сайте.
