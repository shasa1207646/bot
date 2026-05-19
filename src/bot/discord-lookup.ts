import { Client, GuildMember } from 'discord.js';

function matchesUsername(member: GuildMember, cleanName: string): boolean {
  return (
    member.user.username.toLowerCase() === cleanName ||
    member.displayName.toLowerCase() === cleanName ||
    (member.user.globalName != null &&
      member.user.globalName.toLowerCase() === cleanName)
  );
}

function formatMember(member: GuildMember) {
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
}

export async function lookupDiscordUser(client: Client, username: string) {
  try {
    const guildId = process.env.DISCORD_GUILD_ID!;
    const guild = await client.guilds.fetch(guildId);
    const cleanName = username.replace(/^@/, '').toLowerCase().trim();

    // Step 1: search via the API (queries username and display name server-side).
    // guild.members.search() hits the Discord API directly so it works even when
    // the local member cache is empty.
    try {
      const searchResults = await guild.members.search({ query: cleanName, limit: 10 });
      const found = searchResults.find(m => matchesUsername(m, cleanName));
      if (found) return formatMember(found);
    } catch (searchErr) {
      console.warn('[Discord Lookup] members.search() failed, falling back to full fetch:', searchErr);
    }

    // Step 2: fetch all members into the cache and search locally.
    // This is a heavier call but guarantees we have the full member list.
    try {
      await guild.members.fetch();
    } catch (fetchErr) {
      console.warn('[Discord Lookup] members.fetch() failed:', fetchErr);
    }

    const member = guild.members.cache.find(m => matchesUsername(m, cleanName));
    if (!member) return { found: false };

    return formatMember(member);
  } catch (err) {
    console.error('[Discord Lookup]', err);
    return { found: false, error: 'Ошибка при поиске пользователя' };
  }
}
