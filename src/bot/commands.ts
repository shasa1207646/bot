import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  GuildMember,
  ColorResolvable,
} from 'discord.js';

export const commandDefinitions = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Показать все команды бота'),

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Забанить пользователя')
    .addUserOption((o) => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption((o) => o.setName('reason').setDescription('Причина')),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Кикнуть пользователя')
    .addUserOption((o) => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption((o) => o.setName('reason').setDescription('Причина')),

  new SlashCommandBuilder()
    .setName('create-role')
    .setDescription('Создать роль')
    .addStringOption((o) => o.setName('name').setDescription('Название роли').setRequired(true))
    .addStringOption((o) => o.setName('color').setDescription('Цвет в HEX (например #ff0000)')),

  new SlashCommandBuilder()
    .setName('action')
    .setDescription('Выполнить действие над пользователем')
    .addUserOption((o) => o.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption((o) =>
      o
        .setName('type')
        .setDescription('Тип действия')
        .setRequired(true)
        .addChoices(
          { name: 'Выдать роль', value: 'give_role' },
          { name: 'Отправить ЛС', value: 'send_message' }
        )
    )
    .addStringOption((o) =>
      o.setName('value').setDescription('Название роли или текст сообщения').setRequired(true)
    ),
].map((cmd) => cmd.toJSON());

export async function handleHelp(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle('📋 Команды бота')
    .setColor(0x5865f2)
    .addFields(
      { name: '/help', value: 'Показать это меню' },
      { name: '/ban <user> [reason]', value: 'Забанить пользователя' },
      { name: '/kick <user> [reason]', value: 'Кикнуть пользователя' },
      { name: '/create-role <name> [color]', value: 'Создать роль с hex-цветом' },
      { name: '/action <user> give_role <role>', value: 'Выдать пользователю роль по названию' },
      { name: '/action <user> send_message <text>', value: 'Отправить пользователю ЛС' }
    )
    .setTimestamp();
  await interaction.reply({ embeds: [embed] });
}

export async function handleBan(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers)) {
    return interaction.reply({ content: '❌ У вас нет прав для бана.', ephemeral: true });
  }
  const user = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') || 'Не указана';
  const member = interaction.guild?.members.cache.get(user.id);
  if (!member) return interaction.reply({ content: '❌ Пользователь не найден.', ephemeral: true });

  await member.ban({ reason });
  const embed = new EmbedBuilder()
    .setTitle('🔨 Пользователь забанен')
    .setColor(0xff0000)
    .addFields(
      { name: 'Пользователь', value: `${user.tag}`, inline: true },
      { name: 'Причина', value: reason, inline: true }
    )
    .setTimestamp();
  await interaction.reply({ embeds: [embed] });
}

export async function handleKick(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.KickMembers)) {
    return interaction.reply({ content: '❌ У вас нет прав для кика.', ephemeral: true });
  }
  const user = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') || 'Не указана';
  const member = interaction.guild?.members.cache.get(user.id) as GuildMember | undefined;
  if (!member) return interaction.reply({ content: '❌ Пользователь не найден.', ephemeral: true });

  await member.kick(reason);
  const embed = new EmbedBuilder()
    .setTitle('👢 Пользователь кикнут')
    .setColor(0xff9900)
    .addFields(
      { name: 'Пользователь', value: `${user.tag}`, inline: true },
      { name: 'Причина', value: reason, inline: true }
    )
    .setTimestamp();
  await interaction.reply({ embeds: [embed] });
}

export async function handleCreateRole(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageRoles)) {
    return interaction.reply({ content: '❌ У вас нет прав для создания ролей.', ephemeral: true });
  }
  const name = interaction.options.getString('name', true);
  const color = (interaction.options.getString('color') || '#99aab5') as ColorResolvable;

  const role = await interaction.guild?.roles.create({ name, color });
  await interaction.reply({ content: `✅ Роль **${role?.name}** создана!` });
}

export async function handleAction(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser('user', true);
  const type = interaction.options.getString('type', true);
  const value = interaction.options.getString('value', true);
  const member = interaction.guild?.members.cache.get(user.id) as GuildMember | undefined;

  if (type === 'give_role') {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ Нет прав ManageRoles.', ephemeral: true });
    }
    const role = interaction.guild?.roles.cache.find(
      (r) => r.name.toLowerCase() === value.toLowerCase()
    );
    if (!role) return interaction.reply({ content: `❌ Роль "${value}" не найдена.`, ephemeral: true });
    if (!member) return interaction.reply({ content: '❌ Участник не найден.', ephemeral: true });
    await member.roles.add(role);
    await interaction.reply({ content: `✅ Роль **${role.name}** выдана пользователю **${user.tag}**.` });
  } else if (type === 'send_message') {
    try {
      await user.send(value);
      await interaction.reply({ content: `✅ Сообщение отправлено пользователю **${user.tag}**.` });
    } catch {
      await interaction.reply({ content: '❌ Не удалось отправить ЛС (возможно, закрыты).', ephemeral: true });
    }
  }
}
