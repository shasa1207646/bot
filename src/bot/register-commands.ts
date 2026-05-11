import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Список всех команд бота'),

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Забанить пользователя')
    .addUserOption(o => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Причина').setRequired(false)),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Кикнуть пользователя')
    .addUserOption(o => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Причина').setRequired(false)),

  new SlashCommandBuilder()
    .setName('create-role')
    .setDescription('Создать роль')
    .addStringOption(o => o.setName('name').setDescription('Название роли').setRequired(true))
    .addStringOption(o => o.setName('color').setDescription('Цвет в HEX (#ff0000)').setRequired(false)),

  new SlashCommandBuilder()
    .setName('action')
    .setDescription('Выполнить действие с пользователем')
    .addUserOption(o => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(o =>
      o.setName('type').setDescription('Тип действия').setRequired(true)
        .addChoices(
          { name: 'Выдать роль', value: 'give_role' },
          { name: 'Отправить ЛС', value: 'send_message' }
        )
    )
    .addStringOption(o => o.setName('value').setDescription('Роль или текст сообщения').setRequired(true)),
].map(c => c.toJSON());

export async function registerCommands() {
  const token = process.env.DISCORD_BOT_TOKEN!;
  const guildId = process.env.DISCORD_GUILD_ID!;

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    const me: any = await rest.get(Routes.user());
    const appId = me.id;
    await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commands });
    console.log('[Discord] Slash-команды зарегистрированы');
  } catch (err) {
    console.error('[Discord] Ошибка регистрации команд:', err);
  }
}
