import { REST, Routes } from 'discord.js';
import { commandDefinitions } from './commands';

export async function registerCommands(token: string, guildId: string) {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    const me = (await rest.get(Routes.user())) as { id: string };
    const appId = me.id;

    await rest.put(Routes.applicationGuildCommands(appId, guildId), {
      body: commandDefinitions,
    });

    console.log('✅ Slash-команды зарегистрированы');
  } catch (err) {
    console.error('❌ Ошибка регистрации команд:', err);
  }
}
