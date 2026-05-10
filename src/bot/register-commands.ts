import { REST, Routes } from 'discord.js';
import { commands } from './commands';

export async function registerCommands() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  
  if (!token || !guildId) {
    throw new Error('Missing Discord credentials');
  }
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  try {
    // Получаем информацию о боте
    const botInfo = await rest.get(Routes.user());
    const clientId = (botInfo as any).id;
    
    console.log('Registering slash commands...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map(cmd => cmd.toJSON()),
    });
    console.log('✅ Slash commands registered');
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
}
