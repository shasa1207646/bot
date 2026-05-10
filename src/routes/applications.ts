import { Router } from 'express';
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { client } from '../bot/bot';

export const applicationsRouter = Router();

applicationsRouter.post('/applications', async (req, res) => {
  try {
    const { discord_id, discord_username, age, name, activity, games, rules } = req.body;
    
    if (!discord_id || !age || !name || !activity || !rules) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (rules !== 'Да, принимаю') {
      return res.status(400).json({ error: 'Вы должны принять правила' });
    }
    
    const channelId = process.env.DISCORD_CHANNEL_ID;
    if (!channelId) {
      throw new Error('DISCORD_CHANNEL_ID not set');
    }
    
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error('Invalid channel');
    }
    
    const embed = new EmbedBuilder()
      .setColor('#5865f2')
      .setTitle('📝 Новая заявка')
      .addFields(
        { name: 'Сколько лет', value: age, inline: true },
        { name: 'Имя / Ник', value: name, inline: true },
        { name: 'Активность в день', value: activity, inline: true },
        { name: 'Игры', value: games || 'Не указано', inline: true },
        { name: 'Принимает правила', value: rules, inline: true },
        { name: 'Discord ID', value: discord_id, inline: false },
        { name: 'Время подачи', value: new Date().toLocaleString('ru-RU'), inline: false }
      )
      .setFooter({ text: discord_username || 'Не указан' });
    
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`approve_${discord_id}`)
          .setLabel('✅ Принять')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`reject_${discord_id}`)
          .setLabel('❌ Отклонить')
          .setStyle(ButtonStyle.Danger)
      );
    
    await channel.send({ embeds: [embed], components: [row] });
    res.json({ success: true, message: 'Заявка отправлена' });
    
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
