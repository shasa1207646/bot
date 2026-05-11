import { Router, Request, Response } from 'express';
import { sendApplicationEmbed } from '../bot/bot';

export const applicationsRouter = Router();

applicationsRouter.post('/', async (req: Request, res: Response) => {
  const { discord_id, discord_username, age, name, activity, games, rules } = req.body;

  if (!discord_id) {
    res.status(400).json({ error: 'discord_id обязателен' });
    return;
  }

  try {
    await sendApplicationEmbed({ discord_id, discord_username, age, name, activity, games, rules });
    res.json({ success: true, message: 'Заявка отправлена!' });
  } catch (err) {
    console.error('Ошибка отправки заявки:', err);
    res.status(500).json({ error: 'Ошибка при отправке заявки' });
  }
});
