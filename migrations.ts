import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, ColorResolvable } from 'discord.js';

export async function handleCommand(interaction: ChatInputCommandInteraction) {
  const { commandName } = interaction;

  if (commandName === 'help') {
    const embed = new EmbedBuilder()
      .setTitle('📖 Команды бота')
      .setColor('#00ff88')
      .addFields(
        { name: '/help', value: 'Показать это сообщение', inline: false },
        { name: '/ban <user> [reason]', value: 'Забанить пользователя', inline: false },
        { name: '/kick <user> [reason]', value: 'Кикнуть пользователя', inline: false },
        { name: '/create-role <name> [color]', value: 'Создать роль с HEX-цветом', inline: false },
        { name: '/action <user> give_role <role>', value: 'Выдать роль пользователю', inline: false },
        { name: '/action <user> send_message <text>', value: 'Отправить ЛС пользователю', inline: false },
      )
      .setFooter({ text: 'Игровой сервер — Бот администрации' })
      .setTimestamp();
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (commandName === 'ban') {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: '❌ У вас нет прав для бана.', ephemeral: true });
    }
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'Без причины';
    try {
      const guild = interaction.guild!;
      await guild.members.ban(user.id, { reason });
      const embed = new EmbedBuilder()
        .setTitle('🔨 Пользователь забанен')
        .setColor('#ff4444')
        .addFields(
          { name: 'Пользователь', value: `<@${user.id}>`, inline: true },
          { name: 'Причина', value: reason, inline: true },
          { name: 'Модератор', value: `<@${interaction.user.id}>`, inline: true },
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    } catch {
      return interaction.reply({ content: '❌ Не удалось забанить пользователя.', ephemeral: true });
    }
  }

  if (commandName === 'kick') {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({ content: '❌ У вас нет прав для кика.', ephemeral: true });
    }
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'Без причины';
    try {
      const guild = interaction.guild!;
      const member = await guild.members.fetch(user.id);
      await member.kick(reason);
      const embed = new EmbedBuilder()
        .setTitle('👢 Пользователь кикнут')
        .setColor('#ff8800')
        .addFields(
          { name: 'Пользователь', value: `<@${user.id}>`, inline: true },
          { name: 'Причина', value: reason, inline: true },
          { name: 'Модератор', value: `<@${interaction.user.id}>`, inline: true },
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    } catch {
      return interaction.reply({ content: '❌ Не удалось кикнуть пользователя.', ephemeral: true });
    }
  }

  if (commandName === 'create-role') {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ У вас нет прав для создания ролей.', ephemeral: true });
    }
    const name = interaction.options.getString('name', true);
    const color = (interaction.options.getString('color') || '#99aab5') as ColorResolvable;
    try {
      const role = await interaction.guild!.roles.create({ name, color, reason: `Создано через /create-role` });
      return interaction.reply({ content: `✅ Роль **${role.name}** создана!`, ephemeral: true });
    } catch {
      return interaction.reply({ content: '❌ Не удалось создать роль.', ephemeral: true });
    }
  }

  if (commandName === 'action') {
    const user = interaction.options.getUser('user', true);
    const type = interaction.options.getString('type', true);
    const value = interaction.options.getString('value', true);
    const guild = interaction.guild!;

    if (type === 'give_role') {
      const role = guild.roles.cache.find(r => r.name.toLowerCase() === value.toLowerCase());
      if (!role) return interaction.reply({ content: `❌ Роль "${value}" не найдена.`, ephemeral: true });
      try {
        const member = await guild.members.fetch(user.id);
        await member.roles.add(role);
        return interaction.reply({ content: `✅ Роль **${role.name}** выдана <@${user.id}>`, ephemeral: true });
      } catch {
        return interaction.reply({ content: '❌ Не удалось выдать роль.', ephemeral: true });
      }
    }

    if (type === 'send_message') {
      try {
        await user.send(value);
        return interaction.reply({ content: `✅ Сообщение отправлено <@${user.id}>`, ephemeral: true });
      } catch {
        return interaction.reply({ content: '❌ Не удалось отправить сообщение (ЛС закрыты).', ephemeral: true });
      }
    }
  }
}
