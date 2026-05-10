import { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { commands, handleHelp, handleBan, handleKick, handleCreateRole, handleAction } from './commands';
import { containsBadWords } from './badwords';
import { registerCommands } from './register-commands';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message]
});

export async function initBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    throw new Error('DISCORD_BOT_TOKEN is not set');
  }
  
  // Регистрация команд
  await registerCommands();
  
  // Обработка взаимодействий
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    switch (interaction.commandName) {
      case 'help':
        await handleHelp(interaction);
        break;
      case 'ban':
        await handleBan(interaction);
        break;
      case 'kick':
        await handleKick(interaction);
        break;
      case 'create-role':
        await handleCreateRole(interaction);
        break;
      case 'action':
        await handleAction(interaction);
        break;
    }
  });
  
  // Фильтр плохих слов
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (containsBadWords(message.content)) {
      await message.delete();
      const warning = await message.channel.send(`${message.author}, не используйте плохие слова!`);
      setTimeout(() => warning.delete(), 5000);
    }
  });
  
  // Обработка кнопок заявок
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    
    const [action, userId] = interaction.customId.split('_');
    
    if (action === 'approve') {
      const guild = interaction.guild;
      if (!guild) return;
      
      // Поиск или создание роли "Обзвон"
      let role = guild.roles.cache.find(r => r.name === 'Обзвон');
      if (!role) {
        role = await guild.roles.create({
          name: 'Обзвон',
          color: '#57f287',
          reason: 'Автоматическое создание роли для заявок'
        });
      }
      
      const member = await guild.members.fetch(userId);
      await member.roles.add(role);
      
      const voiceChannelUrl = `https://discord.com/channels/${process.env.DISCORD_GUILD_ID}/${process.env.DISCORD_VOICE_CHANNEL_ID}`;
      await member.send(`✅ Ваша заявка одобрена! Присоединяйтесь к голосовому каналу: ${voiceChannelUrl}`);
      
      await interaction.update({ content: '✅ Заявка одобрена', components: [] });
    } 
    else if (action === 'reject') {
      const user = await client.users.fetch(userId);
      await user.send('❌ Ваша заявка отклонена');
      await interaction.update({ content: '❌ Заявка отклонена', components: [] });
    }
  });
  
  await client.login(token);
}

export { client };
