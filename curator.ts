import pool from './pool';

export async function runMigrations() {
  const client = await pool.connect();
  try {
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

      CREATE TABLE IF NOT EXISTS moderator_sessions (
        telegram_user_id  BIGINT PRIMARY KEY,
        telegram_username VARCHAR(100),
        discord_user_id   VARCHAR(30),
        discord_username  VARCHAR(100),
        discord_roles     TEXT[],
        is_moderator      BOOLEAN DEFAULT false,
        authorized_at     TIMESTAMP DEFAULT NOW(),
        expires_at        TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS oauth_states (
        state             VARCHAR(64) PRIMARY KEY,
        telegram_user_id  BIGINT,
        created_at        TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('[DB] Migrations completed');
  } catch (err) {
    console.error('[DB] Migration error:', err);
  } finally {
    client.release();
  }
}
