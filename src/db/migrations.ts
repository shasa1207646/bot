import pool from './pool';

export async function runMigrations() {
  const client = await pool.connect();
  try {
    // Drop the legacy moderator_sessions table — it is no longer used by any
    // code path and its NOT NULL PRIMARY KEY on telegram_user_id causes
    // constraint violations when the web OAuth flow stores a NULL telegram_user_id
    // in oauth_states and the callback attempts to insert into this table.
    await client.query(`DROP TABLE IF EXISTS moderator_sessions CASCADE;`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id              SERIAL PRIMARY KEY,
        type            VARCHAR(20) NOT NULL DEFAULT 'member',
        discord_id      VARCHAR(30),
        username        VARCHAR(100),
        age             INT,
        name            VARCHAR(100),
        activity        VARCHAR(200),
        games           VARCHAR(300),
        rules           BOOLEAN,
        experience      TEXT,
        motivation      TEXT,
        status          VARCHAR(20) DEFAULT 'pending',
        decided_by      VARCHAR(100),
        tg_message_id   BIGINT,
        tg_chat_id      BIGINT,
        created_at      TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS oauth_states (
        state             VARCHAR(64) PRIMARY KEY,
        telegram_user_id  BIGINT,
        created_at        TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS mutes (
        id          SERIAL PRIMARY KEY,
        user_id     VARCHAR(30) NOT NULL,
        username    VARCHAR(100),
        reason      TEXT,
        muted_at    TIMESTAMP DEFAULT NOW(),
        muted_by    VARCHAR(100),
        expires_at  TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bans (
        id          SERIAL PRIMARY KEY,
        user_id     VARCHAR(30) NOT NULL,
        username    VARCHAR(100),
        reason      TEXT,
        banned_at   TIMESTAMP DEFAULT NOW(),
        banned_by   VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS web_mod_sessions (
        id               VARCHAR(64) PRIMARY KEY,
        discord_id       VARCHAR(30) NOT NULL,
        discord_username VARCHAR(100),
        discord_avatar   VARCHAR(300),
        is_moderator     BOOLEAN DEFAULT false,
        created_at       TIMESTAMP DEFAULT NOW(),
        expires_at       TIMESTAMP
      );

      ALTER TABLE applications ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
    `);
    console.log('[DB] Migrations completed');
  } catch (err) {
    console.error('[DB] Migration error:', err);
  } finally {
    client.release();
  }
}
