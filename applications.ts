import axios from 'axios';

export async function sendApplicationToTelegram(app: any): Promise<void> {
  const webhookUrl = process.env.BOTHOST_WEBHOOK_URL;
  const secret = process.env.INTERNAL_SECRET;

  if (!webhookUrl) {
    console.warn('[Telegram] BOTHOST_WEBHOOK_URL не задан');
    return;
  }

  try {
    await axios.post(webhookUrl, app, {
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': secret || '',
      },
      timeout: 10000,
    });
    console.log('[Telegram] Заявка отправлена на BotHost');
  } catch (err: any) {
    console.error('[Telegram] Ошибка отправки на BotHost:', err?.message);
  }
}
