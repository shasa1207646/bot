import { Client } from 'discord.js';

export async function lookupDiscordUser(client: Client, username: string) {
  try {
    const guildId = process.env.DISCORD_GUILD_ID!;
    const guild = await client.guilds.fetch(guildId);
    const cleanName = username.replace(/^@/, '').toLowerCase().trim();

    // Fetch all members
    await guild.members.fetch();

    const member = guild.members.cache.find(m =>
      m.user.username.toLowerCase() === cleanName ||
      m.displayName.toLowerCase() === cleanName ||
      (m.user.globalName && m.user.globalName.toLowerCase() === cleanName)
    );

    if (!member) return { found: false };

    return {
      found: true,
      discord_id: member.user.id,
      username: '@' + member.user.username,
      displayName: member.displayName,
      avatar: member.user.displayAvatarURL({ size: 128 }),
      roles: member.roles.cache
        .filter(r => r.name !== '@everyone')
        .map(r => ({ name: r.name, color: r.hexColor })),
      joinedAt: member.joinedAt?.toISOString(),
    };
  } catch (err) {
    console.error('[Discord Lookup]', err);
    return { found: false, error: 'Ошибка при поиске пользователя' };
  }
}
