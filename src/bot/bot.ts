import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  ChatInputCommandInteraction,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
  GuildMember,
} from 'discord.js';
import { containsBadWord } from './badwords';
import {
  handleHelp,
  handleBan,
  handleKick,
  handleCreateRole,
  handleAction,
} from './commands';
import { registerCommands } from './register-commands';

export let client: Client;

export async function startBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!token || !guildId) {
    console.error('❌ DISCORD_BOT_TOKEN или DISCORD_GUILD_ID не указаны в .env');
    return;
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message],
  });

  client.once(Events.ClientReady, async () => {
    console.log(`✅ Бот запущен как ${client.user?.tag}`);
    await registerCommands(token, guildId);
  });

  // Slash commands
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const cmd = interaction as ChatInputCommandInteraction;
      try {
        switch (cmd.commandName) {
          case 'help': await handleHelp(cmd); break;
          case 'ban': await handleBan(cmd); break;
          case 'kick': await handleKick(cmd); break;
          case 'create-role': await handleCreateRole(cmd); break;
          case 'action': await handleAction(cmd); break;
        }
      } catch (err) {
        console.error('❌ Ошибка команды:', err);
        if (!cmd.replied) await cmd.reply({ content: '❌ Произошла ошибка.', ephemeral: true });
      }
    }

    // Button interactions (approve/reject applications)
    if (interaction.isButton()) {
      const btn = interaction as ButtonInteraction;
      await handleApplicationButton(btn);
    }
  });

  // Bad words filter
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (containsBadWord(message.content)) {
      try {
        await message.delete();
        const warning = await message.channel.send(
          `⚠️ ${message.author}, нецензурная лексика запрещена!`
        );
        setTimeout(() => warning.delete().catch(() => {}), 5000);
      } catch (err) {
        console.error('❌ Ошибка фильтра слов:', err);
      }
    }
  });

  try {
    await client.login(token);
  } catch (err) {
    console.error('❌ Не удалось войти в Discord:', err);
  }
}

async function handleApplicationButton(interaction: ButtonInteraction) {
  const { customId, guild } = interaction;

  if (customId.startsWith('approve_')) {
    const userId = customId.replace('approve_', '');
    const voiceChannelId = process.env.DISCORD_VOICE_CHANNEL_ID || '';
    const guildId = process.env.DISCORD_GUILD_ID || '';

    try {
      await interaction.deferUpdate();
      const member = await guild?.members.fetch(userId) as GuildMember | undefined;
      if (!member) {
        await interaction.followUp({ content: '❌ Пользователь не найден на сервере.', ephemeral: true });
        return;
      }

      // Find or create "Обзвон" role
      let role = guild?.roles.cache.find((r) => r.name === 'Обзвон');
      if (!role) {
        role = await guild?.roles.create({ name: 'Обзвон', color: 0x57f287 });
      }
      if (role) await member.roles.add(role);

      // DM the user
      const link = `https://discord.com/channels/${guildId}/${voiceChannelId}`;
      try {
        await member.send(`✅ Ваша заявка **принята**! Присоединяйтесь к голосовому каналу: ${link}`);
      } catch {
        console.warn('Не удалось отправить ЛС пользователю', userId);
      }

      // Update embed
      const embed = EmbedBuilder.from(interaction.message.embeds[0])
        .setColor(0x57f287)
        .setFooter({ text: `✅ Принято — ${interaction.user.tag}` });

      await interaction.editReply({ embeds: [embed], components: [] });
    } catch (err) {
      console.error('Ошибка при approve:', err);
    }
  }

  if (customId.startsWith('reject_')) {
    const userId = customId.replace('reject_', '');
    try {
      await interaction.deferUpdate();
      const member = await guild?.members.fetch(userId) as GuildMember | undefined;

      try {
        await member?.send('❌ Ваша заявка была **отклонена**.');
      } catch {
        console.warn('Не удалось отправить ЛС пользователю', userId);
      }

      const embed = EmbedBuilder.from(interaction.message.embeds[0])
        .setColor(0xed4245)
        .setFooter({ text: `❌ Отклонено — ${interaction.user.tag}` });

      await interaction.editReply({ embeds: [embed], components: [] });
    } catch (err) {
      console.error('Ошибка при reject:', err);
    }
  }
}

export async function sendApplicationEmbed(data: {
  discord_id: string;
  discord_username?: string;
  age?: string;
  name?: string;
  activity?: string;
  games?: string;
  rules?: string;
}) {
  const channelId = process.env.DISCORD_CHANNEL_ID;
  if (!channelId || !client) return;

  const channel = client.channels.cache.get(channelId) as TextChannel | undefined;
  if (!channel) {
    console.error('❌ Канал для заявок не найден:', channelId);
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('📩 Новая заявка')
    .setColor(0x5865f2)
    .addFields(
      { name: 'Discord ID', value: data.discord_id, inline: true },
      { name: 'Ник', value: data.discord_username || '—', inline: true },
      { name: 'Сколько лет', value: data.age || '—', inline: true },
      { name: 'Имя / Ник', value: data.name || '—', inline: true },
      { name: 'Активность в день', value: data.activity || '—', inline: true },
      { name: 'Игры', value: data.games || '—', inline: true },
      { name: 'Принимает правила', value: data.rules || '—', inline: true },
      { name: 'Время подачи', value: new Date().toLocaleString('ru-RU'), inline: true }
    )
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`approve_${data.discord_id}`)
      .setLabel('✅ Принять')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`reject_${data.discord_id}`)
      .setLabel('❌ Отклонить')
      .setStyle(ButtonStyle.Danger)
  );

  await channel.send({ embeds: [embed], components: [row] });
}
