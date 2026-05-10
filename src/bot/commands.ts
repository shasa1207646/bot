import { 
  SlashCommandBuilder, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Показать все команды бота'),
  
  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Забанить пользователя')
    .addUserOption(option => 
      option.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(option => 
      option.setName('reason').setDescription('Причина').setRequired(false)),
  
  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Кикнуть пользователя')
    .addUserOption(option => 
      option.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(option => 
      option.setName('reason').setDescription('Причина').setRequired(false)),
  
  new SlashCommandBuilder()
    .setName('create-role')
    .setDescription('Создать новую роль')
    .addStringOption(option => 
      option.setName('name').setDescription('Название роли').setRequired(true))
    .addStringOption(option => 
      option.setName('color').setDescription('Цвет в HEX').setRequired(false)),
  
  new SlashCommandBuilder()
    .setName('action')
    .setDescription('Выполнить действие')
    .addUserOption(option => 
      option.setName('user').setDescription('Пользователь').setRequired(true))
    .addStringOption(option => 
      option.setName('type').setDescription('Тип действия')
      .addChoices(
        { name: 'Выдать роль', value: 'give_role' },
        { name: 'Отправить сообщение', value: 'send_message' }
      ).setRequired(true))
    .addStringOption(option => 
      option.setName('value').setDescription('Название роли или сообщение').setRequired(true))
];

export async function handleHelp(interaction: any) {
  const embed = new EmbedBuilder()
    .setColor('#5865f2')
    .setTitle('📚 Список команд')
    .addFields(
      { name: '/help', value: 'Показать это сообщение', inline: false },
      { name: '/ban <user> [reason]', value: 'Забанить пользователя (требует права BanMembers)', inline: false },
      { name: '/kick <user> [reason]', value: 'Кикнуть пользователя (требует права KickMembers)', inline: false },
      { name: '/create-role <name> [color]', value: 'Создать роль (требует ManageRoles)', inline: false },
      { name: '/action <user> <type> <value>', value: 'give_role или send_message', inline: false }
    )
    .setFooter({ text: 'Пример: /ban @user Нарушение правил' });
  
  await interaction.reply({ embeds: [embed] });
}

export async function handleBan(interaction: any) {
  if (!interaction.memberPermissions.has('BanMembers')) {
    return interaction.reply({ content: '❌ У вас нет прав на бан пользователей!', ephemeral: true });
  }
  
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason') || 'Причина не указана';
  
  const embed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('🔨 Бан пользователя')
    .setDescription(`Пользователь ${user.tag} был забанен`)
    .addFields(
      { name: 'Причина', value: reason, inline: true },
      { name: 'Модератор', value: interaction.user.tag, inline: true }
    )
    .setTimestamp();
  
  await interaction.guild.members.ban(user, { reason });
  await interaction.reply({ embeds: [embed] });
}

export async function handleKick(interaction: any) {
  if (!interaction.memberPermissions.has('KickMembers')) {
    return interaction.reply({ content: '❌ У вас нет прав на кик пользователей!', ephemeral: true });
  }
  
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason') || 'Причина не указана';
  
  const embed = new EmbedBuilder()
    .setColor('#ff9900')
    .setTitle('👢 Кик пользователя')
    .setDescription(`Пользователь ${user.tag} был кикнут`)
    .addFields(
      { name: 'Причина', value: reason, inline: true },
      { name: 'Модератор', value: interaction.user.tag, inline: true }
    )
    .setTimestamp();
  
  const member = await interaction.guild.members.fetch(user.id);
  await member.kick(reason);
  await interaction.reply({ embeds: [embed] });
}

export async function handleCreateRole(interaction: any) {
  if (!interaction.memberPermissions.has('ManageRoles')) {
    return interaction.reply({ content: '❌ У вас нет прав на управление ролями!', ephemeral: true });
  }
  
  const name = interaction.options.getString('name');
  const color = interaction.options.getString('color') || '#99aab5';
  
  const role = await interaction.guild.roles.create({
    name: name,
    color: color,
    reason: `Создана ${interaction.user.tag}`
  });
  
  await interaction.reply({ content: `✅ Роль ${role} создана!`, ephemeral: true });
}

export async function handleAction(interaction: any) {
  const user = interaction.options.getUser('user');
  const type = interaction.options.getString('type');
  const value = interaction.options.getString('value');
  
  if (type === 'give_role') {
    const role = interaction.guild.roles.cache.find(r => r.name === value);
    if (!role) {
      return interaction.reply({ content: `❌ Роль "${value}" не найдена!`, ephemeral: true });
    }
    
    const member = await interaction.guild.members.fetch(user.id);
    await member.roles.add(role);
    await interaction.reply({ content: `✅ Роль ${role} выдана пользователю ${user.tag}`, ephemeral: true });
  } 
  else if (type === 'send_message') {
    try {
      await user.send(value);
      await interaction.reply({ content: `✅ Сообщение отправлено ${user.tag}`, ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: `❌ Не удалось отправить сообщение (возможно у пользователя закрыты ЛС)`, ephemeral: true });
    }
  }
}
