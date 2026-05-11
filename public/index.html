<!DOCTYPE html>
<html lang="ru" data-theme="gaming">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GameVerse — Игровой сервер</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&family=Cinzel+Decorative:wght@400;700&family=Nunito:wght@400;600;700&family=Exo+2:wght@400;600;700&family=Share+Tech+Mono&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════
   ТЕМЫ
═══════════════════════════════════════ */
[data-theme="gaming"] {
  --primary: #00ff88;
  --primary-dim: #00cc6a;
  --bg: #0a0a0f;
  --surface: #12121a;
  --surface2: #1a1a26;
  --border: #2a2a3a;
  --accent: #7c3aed;
  --accent2: #a855f7;
  --text: #e2e8f0;
  --text-muted: #8892a0;
  --danger: #ff4444;
  --success: #00ff88;
  --font-title: 'Orbitron', sans-serif;
  --font-body: 'Rajdhani', sans-serif;
  --glow: 0 0 20px rgba(0,255,136,0.3);
  --glow-accent: 0 0 20px rgba(124,58,237,0.4);
}
[data-theme="anime"] {
  --primary: #ff6b9d;
  --primary-dim: #cc4477;
  --bg: #0d0a1a;
  --surface: #1a1025;
  --surface2: #22153a;
  --border: #3a2050;
  --accent: #a855f7;
  --accent2: #c084fc;
  --text: #fce4f8;
  --text-muted: #a87ab0;
  --danger: #ff4488;
  --success: #88ffcc;
  --font-title: 'Cinzel Decorative', cursive;
  --font-body: 'Nunito', sans-serif;
  --glow: 0 0 20px rgba(255,107,157,0.4);
  --glow-accent: 0 0 20px rgba(168,85,247,0.4);
}
[data-theme="scifi"] {
  --primary: #00d4ff;
  --primary-dim: #0099cc;
  --bg: #030810;
  --surface: #071224;
  --surface2: #0d1f3c;
  --border: #1a3060;
  --accent: #0066ff;
  --accent2: #4499ff;
  --text: #cce8ff;
  --text-muted: #6090bb;
  --danger: #ff3366;
  --success: #00ffcc;
  --font-title: 'Exo 2', sans-serif;
  --font-body: 'Share Tech Mono', monospace;
  --glow: 0 0 20px rgba(0,212,255,0.4);
  --glow-accent: 0 0 20px rgba(0,102,255,0.4);
}
[data-theme="minimal"] {
  --primary: #6366f1;
  --primary-dim: #4f46e5;
  --bg: #09090b;
  --surface: #18181b;
  --surface2: #27272a;
  --border: #3f3f46;
  --accent: #8b5cf6;
  --accent2: #a78bfa;
  --text: #fafafa;
  --text-muted: #71717a;
  --danger: #ef4444;
  --success: #22c55e;
  --font-title: 'DM Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --glow: 0 0 15px rgba(99,102,241,0.3);
  --glow-accent: 0 0 15px rgba(139,92,246,0.3);
}

/* ═══════════════════════════════════════
   BASE
═══════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}

/* Фоновая сетка */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.container { max-width: 900px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1; }

/* ─── HEADER ─── */
header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.logo {
  font-family: var(--font-title);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--primary);
  text-shadow: var(--glow);
  letter-spacing: 2px;
  text-decoration: none;
}
.logo span { color: var(--accent2); }

/* Переключатель тем */
.themes {
  display: flex;
  gap: 6px;
  align-items: center;
}
.theme-label { font-size: 0.75rem; color: var(--text-muted); margin-right: 4px; }
.theme-btn {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.theme-btn:hover, .theme-btn.active { border-color: var(--text); transform: scale(1.15); }
.theme-btn[data-t="gaming"] { background: linear-gradient(135deg, #00ff88, #7c3aed); }
.theme-btn[data-t="anime"]  { background: linear-gradient(135deg, #ff6b9d, #a855f7); }
.theme-btn[data-t="scifi"]  { background: linear-gradient(135deg, #00d4ff, #0066ff); }
.theme-btn[data-t="minimal"]{ background: linear-gradient(135deg, #6366f1, #8b5cf6); }

/* ─── NAV ─── */
nav {
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  min-width: max-content;
}
.nav-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
  letter-spacing: 0.5px;
}
.nav-btn:hover { color: var(--text); background: rgba(255,255,255,0.05); }
.nav-btn.active { color: var(--primary); border-bottom-color: var(--primary); text-shadow: var(--glow); }

/* ─── MAIN ─── */
main { padding: 40px 0 80px; }

.tab { display: none; }
.tab.active { display: block; }

/* ─── CARDS ─── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 20px;
}
.card-title {
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ─── FORMS ─── */
.form-group { margin-bottom: 18px; }
.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 10px 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0,255,136,0.1);
}
.form-group input::placeholder { color: var(--text-muted); }
.form-group textarea { resize: vertical; min-height: 80px; }
.form-group select option { background: var(--surface2); }

/* Username с @ */
.username-wrap { position: relative; }
.username-wrap .at-sign {
  position: absolute;
  left: 14px; top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  font-weight: 700;
}
.username-wrap input { padding-left: 26px; }

/* Статус проверки игрока */
.discord-check {
  margin-top: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: none;
}
.discord-check.found {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0,255,136,0.08);
  border: 1px solid rgba(0,255,136,0.3);
  color: var(--success);
}
.discord-check.not-found {
  display: block;
  background: rgba(255,68,68,0.08);
  border: 1px solid rgba(255,68,68,0.3);
  color: var(--danger);
}
.discord-check .avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 2px solid var(--primary);
}
.discord-check .user-info { flex: 1; }
.discord-check .user-info .uname { font-weight: 700; }
.discord-check .roles {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.role-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--surface2);
  border: 1px solid var(--border);
}

/* Кнопки */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn-primary {
  background: var(--primary);
  color: #000;
  box-shadow: var(--glow);
}
.btn-primary:hover { background: var(--primary-dim); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-accent {
  background: var(--accent);
  color: #fff;
  box-shadow: var(--glow-accent);
}
.btn-accent:hover { background: var(--accent2); transform: translateY(-1px); }
.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}
.btn-outline:hover { background: rgba(0,255,136,0.1); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

/* Уведомления */
.alert {
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 600;
  display: none;
}
.alert.success { display: block; background: rgba(0,255,136,0.12); border: 1px solid var(--success); color: var(--success); }
.alert.error { display: block; background: rgba(255,68,68,0.12); border: 1px solid var(--danger); color: var(--danger); }
.alert.loading { display: block; background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: var(--text-muted); }

/* ─── AI CHAT ─── */
.chat-window {
  height: 380px;
  overflow-y: auto;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}
.chat-msg {
  display: flex;
  gap: 10px;
  animation: fadeUp 0.3s ease;
}
.chat-msg.user { flex-direction: row-reverse; }
.chat-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  font-weight: 700;
}
.chat-avatar.bot { background: var(--accent); color: #fff; }
.chat-avatar.user { background: var(--primary); color: #000; }
.chat-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
}
.chat-msg.bot .chat-bubble { background: var(--surface); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
.chat-msg.user .chat-bubble { background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
.chat-typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  border-bottom-left-radius: 4px;
  width: fit-content;
}
.dot {
  width: 7px; height: 7px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: bounce 1.2s infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%,60%,100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.chat-input-row {
  display: flex;
  gap: 10px;
}
.chat-input-row input {
  flex: 1;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;
}
.chat-input-row input:focus { border-color: var(--primary); }

/* ─── COMMANDS ─── */
.cmd-grid {
  display: grid;
  gap: 12px;
}
.cmd-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 20px;
  transition: border-color 0.2s;
}
.cmd-card:hover { border-color: var(--primary); }
.cmd-name {
  font-family: 'Share Tech Mono', monospace;
  color: var(--primary);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.cmd-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 6px; }
.cmd-example {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent2);
  background: var(--bg);
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
}

/* ─── ABOUT / INFO ─── */
.info-block {
  background: var(--surface2);
  border-left: 3px solid var(--primary);
  padding: 16px 20px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 16px;
}
.steps { counter-reset: step; list-style: none; }
.steps li {
  counter-increment: step;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.steps li:last-child { border-bottom: none; }
.steps li::before {
  content: counter(step);
  background: var(--accent);
  color: #fff;
  width: 26px; height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Code block */
.code-block {
  position: relative;
  background: #050508;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: #a8ff78;
  overflow-x: auto;
  white-space: pre;
  line-height: 1.6;
}
.copy-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.copy-btn:hover { border-color: var(--primary); color: var(--primary); }

/* ─── HERO ─── */
.hero {
  text-align: center;
  padding: 40px 0 20px;
}
.hero-title {
  font-family: var(--font-title);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--primary);
  text-shadow: var(--glow);
  line-height: 1.1;
  margin-bottom: 16px;
}
.hero-sub {
  color: var(--text-muted);
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto 30px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 4px;
}
.hero-badge .dot-online {
  width: 8px; height: 8px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Section title */
.section-title {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.2);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 600px) {
  .header-inner { flex-direction: column; align-items: flex-start; }
  .card { padding: 18px; }
  .chat-window { height: 280px; }
}
</style>
</head>
<body>

<!-- HEADER -->
<header>
  <div class="container">
    <div class="header-inner">
      <a class="logo" href="#">Game<span>Verse</span></a>
      <div class="themes">
        <span class="theme-label">Тема:</span>
        <button class="theme-btn active" data-t="gaming" title="Игровая" onclick="setTheme('gaming',this)"></button>
        <button class="theme-btn" data-t="anime" title="Аниме" onclick="setTheme('anime',this)"></button>
        <button class="theme-btn" data-t="scifi" title="Sci-Fi" onclick="setTheme('scifi',this)"></button>
        <button class="theme-btn" data-t="minimal" title="Минимализм" onclick="setTheme('minimal',this)"></button>
      </div>
    </div>
  </div>
</header>

<!-- NAV -->
<nav>
  <div class="container">
    <ul class="nav-list">
      <li><button class="nav-btn active" onclick="switchTab('home',this)">🏠 Главная</button></li>
      <li><button class="nav-btn" onclick="switchTab('apply',this)">📋 Вступить</button></li>
      <li><button class="nav-btn" onclick="switchTab('curator',this)">👑 Куратор</button></li>
      <li><button class="nav-btn" onclick="switchTab('moderator',this)">🛡️ Модератор</button></li>
      <li><button class="nav-btn" onclick="switchTab('ai',this)">🤖 AI-помощник</button></li>
      <li><button class="nav-btn" onclick="switchTab('commands',this)">⚔️ Команды</button></li>
      <li><button class="nav-btn" onclick="switchTab('about',this)">ℹ️ О сервере</button></li>
    </ul>
  </div>
</nav>

<main>
<div class="container">

<!-- ══════════ ГЛАВНАЯ ══════════ -->
<div id="tab-home" class="tab active">
  <div class="hero">
    <div class="hero-title">GameVerse<br>Server</div>
    <p class="hero-sub">Лучший игровой сервер для геймеров. Заходи, играй, общайся.</p>
    <div>
      <span class="hero-badge"><span class="dot-online"></span> Discord онлайн</span>
      <span class="hero-badge"><span class="dot-online"></span> Telegram бот активен</span>
    </div>
    <br><br>
    <button class="btn btn-primary" onclick="switchTab('apply', document.querySelector('.nav-btn:nth-child(2)'))">
      🎮 Подать заявку
    </button>
    &nbsp;
    <button class="btn btn-accent" onclick="switchTab('ai', document.querySelector('.nav-btn:nth-child(4)'))">
      🤖 Спросить AI
    </button>
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:20px">
    <div class="card" style="text-align:center">
      <div style="font-size:2rem;margin-bottom:8px">🎮</div>
      <div style="font-family:var(--font-title);color:var(--primary);margin-bottom:6px">Игровое сообщество</div>
      <div style="color:var(--text-muted);font-size:0.9rem">Играем вместе, общаемся, организуем ивенты</div>
    </div>
    <div class="card" style="text-align:center">
      <div style="font-size:2rem;margin-bottom:8px">🛡️</div>
      <div style="font-family:var(--font-title);color:var(--primary);margin-bottom:6px">Строгая модерация</div>
      <div style="color:var(--text-muted);font-size:0.9rem">Заявки проверяют реальные модераторы в Discord и Telegram</div>
    </div>
    <div class="card" style="text-align:center">
      <div style="font-size:2rem;margin-bottom:8px">🤖</div>
      <div style="font-family:var(--font-title);color:var(--primary);margin-bottom:6px">AI-помощник</div>
      <div style="color:var(--text-muted);font-size:0.9rem">GPT-4 ответит на вопросы о сервере 24/7</div>
    </div>
  </div>
</div>

<!-- ══════════ ВСТУПИТЬ ══════════ -->
<div id="tab-apply" class="tab">
  <div class="section-title">🎮 Заявка на вступление</div>

  <div class="card">
    <div class="form-group">
      <label>Discord @ник *</label>
      <div class="username-wrap">
        <span class="at-sign">@</span>
        <input type="text" id="apply-username" placeholder="ваш_ник" oninput="debounceCheck('apply')">
      </div>
      <div class="discord-check" id="apply-check"></div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="form-group">
        <label>Возраст *</label>
        <input type="number" id="apply-age" min="10" max="60" placeholder="18">
      </div>
      <div class="form-group">
        <label>Ваше имя *</label>
        <input type="text" id="apply-name" placeholder="Иван или ник">
      </div>
    </div>

    <div class="form-group">
      <label>Активность в день *</label>
      <select id="apply-activity">
        <option value="">Выберите...</option>
        <option>1-2 часа</option>
        <option>3-4 часа</option>
        <option>5-6 часов</option>
        <option>Больше 6 часов</option>
        <option>По выходным</option>
      </select>
    </div>

    <div class="form-group">
      <label>В какие игры играете</label>
      <input type="text" id="apply-games" placeholder="Minecraft, CS2, Valorant... (необязательно)">
    </div>

    <div class="form-group">
      <label>Принимаете правила сервера? *</label>
      <select id="apply-rules">
        <option value="">Выберите...</option>
        <option value="yes">Да, принимаю</option>
        <option value="no">Нет</option>
      </select>
    </div>

    <button class="btn btn-primary" onclick="submitApply()" id="apply-btn">
      📤 Отправить заявку
    </button>
    <div class="alert" id="apply-alert"></div>
  </div>
</div>

<!-- ══════════ КУРАТОР ══════════ -->
<div id="tab-curator" class="tab">
  <div class="section-title">👑 Заявка на куратора</div>

  <div class="card">
    <p style="color:var(--text-muted);margin-bottom:20px;font-size:0.95rem">
      Куратор — помощник администрации сервера. Помогает новым участникам, следит за порядком, организует мероприятия.
    </p>

    <div class="form-group">
      <label>Discord @ник *</label>
      <div class="username-wrap">
        <span class="at-sign">@</span>
        <input type="text" id="cur-username" placeholder="ваш_ник" oninput="debounceCheck('cur')">
      </div>
      <div class="discord-check" id="cur-check"></div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="form-group">
        <label>Возраст *</label>
        <input type="number" id="cur-age" min="14" max="60" placeholder="18">
      </div>
      <div class="form-group">
        <label>Ваше имя *</label>
        <input type="text" id="cur-name" placeholder="Иван">
      </div>
    </div>

    <div class="form-group">
      <label>Активность в день *</label>
      <select id="cur-activity">
        <option value="">Выберите...</option>
        <option>1-2 часа</option>
        <option>3-4 часа</option>
        <option>5-6 часов</option>
        <option>Больше 6 часов</option>
      </select>
    </div>

    <div class="form-group">
      <label>Игры</label>
      <input type="text" id="cur-games" placeholder="Необязательно">
    </div>

    <div class="form-group">
      <label>Опыт модерации / управления * </label>
      <textarea id="cur-experience" rows="3" placeholder="Расскажите об опыте администрирования, модерации других серверов, организации сообществ..."></textarea>
    </div>

    <div class="form-group">
      <label>Почему хотите стать куратором? *</label>
      <textarea id="cur-motivation" rows="3" placeholder="Напишите свою мотивацию, чем вы можете помочь серверу..."></textarea>
    </div>

    <div class="form-group">
      <label>Принимаете правила сервера? *</label>
      <select id="cur-rules">
        <option value="">Выберите...</option>
        <option value="yes">Да, принимаю</option>
        <option value="no">Нет</option>
      </select>
    </div>

    <button class="btn btn-accent" onclick="submitCurator()" id="cur-btn">
      👑 Подать заявку на куратора
    </button>
    <div class="alert" id="cur-alert"></div>
  </div>
</div>

<!-- ══════════ AI ══════════ -->
<div id="tab-ai" class="tab">
  <div class="section-title">🤖 AI-помощник</div>

  <div class="card">
    <p style="color:var(--text-muted);margin-bottom:16px;font-size:0.9rem">
      Спросите всё о сервере, правилах, командах или просто пообщайтесь. Работает на GPT-4o-mini.
    </p>

    <div class="chat-window" id="chat-window">
      <div class="chat-msg bot">
        <div class="chat-avatar bot">🤖</div>
        <div class="chat-bubble">
          Привет! Я AI-помощник GameVerse. Могу рассказать о правилах сервера, как подать заявку, о командах бота и многом другом. Что тебя интересует? 🎮
        </div>
      </div>
    </div>

    <div class="chat-input-row">
      <input type="text" id="chat-input" placeholder="Напишите сообщение..." maxlength="500"
        onkeydown="if(event.key==='Enter')sendChat()">
      <button class="btn btn-primary" onclick="sendChat()" id="chat-send-btn">Отправить</button>
    </div>
  </div>
</div>

<!-- ══════════ КОМАНДЫ ══════════ -->
<!-- ══════════ МОДЕРАТОР ══════════ -->
<div id="tab-moderator" class="tab">
  <div class="section-title">🛡️ Заявка на модератора</div>

  <div class="card">
    <p style="color:var(--text-muted);margin-bottom:20px;font-size:0.95rem">
      Модератор — страж порядка сервера. Следит за соблюдением правил, банит нарушителей, обрабатывает жалобы и помогает участникам.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:6px">⚖️</div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Контроль правил</div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:6px">🔨</div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Бан / Кик / Мьют</div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:6px">📩</div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Обработка заявок</div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;margin-bottom:6px">🕐</div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Онлайн от 2ч/день</div>
      </div>
    </div>

    <div class="form-group">
      <label>Discord @ник *</label>
      <div class="username-wrap">
        <span class="at-sign">@</span>
        <input type="text" id="mod-username" placeholder="ваш_ник" oninput="debounceCheck('mod')">
      </div>
      <div class="discord-check" id="mod-check"></div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="form-group">
        <label>Возраст *</label>
        <input type="number" id="mod-age" min="14" max="60" placeholder="16">
      </div>
      <div class="form-group">
        <label>Ваше имя *</label>
        <input type="text" id="mod-name" placeholder="Иван">
      </div>
    </div>

    <div class="form-group">
      <label>Активность в день *</label>
      <select id="mod-activity">
        <option value="">Выберите...</option>
        <option>2-3 часа</option>
        <option>3-4 часа</option>
        <option>5-6 часов</option>
        <option>Больше 6 часов</option>
      </select>
    </div>

    <div class="form-group">
      <label>Часовой пояс *</label>
      <select id="mod-timezone">
        <option value="">Выберите...</option>
        <option>UTC+2 (Калининград)</option>
        <option>UTC+3 (Москва)</option>
        <option>UTC+4 (Самара)</option>
        <option>UTC+5 (Екатеринбург)</option>
        <option>UTC+6 (Омск)</option>
        <option>UTC+7 (Красноярск)</option>
        <option>UTC+8 (Иркутск)</option>
        <option>UTC+9 (Якутск)</option>
        <option>UTC+10 (Владивосток)</option>
        <option>Другой</option>
      </select>
    </div>

    <div class="form-group">
      <label>Опыт модерации *</label>
      <textarea id="mod-experience" rows="3" placeholder="Модерировали другие серверы/сообщества? Укажите название и роль. Если нет — напишите 'Нет опыта'."></textarea>
    </div>

    <div class="form-group">
      <label>Как бы вы поступили с нарушителем? *</label>
      <textarea id="mod-situation" rows="3" placeholder="Опишите ваши действия: игрок систематически оскорбляет других участников и игнорирует предупреждения..."></textarea>
    </div>

    <div class="form-group">
      <label>Почему именно вы? *</label>
      <textarea id="mod-motivation" rows="3" placeholder="Расскажите, почему хотите стать модератором и чем можете быть полезны серверу..."></textarea>
    </div>

    <div class="form-group">
      <label>Есть ли у вас Discord Nitro или буст сервера?</label>
      <select id="mod-nitro">
        <option value="no">Нет</option>
        <option value="nitro">Есть Nitro</option>
        <option value="boost">Бустю этот сервер</option>
        <option value="both">Nitro + бустю сервер</option>
      </select>
    </div>

    <div class="form-group">
      <label>Принимаете правила и обязанности модератора? *</label>
      <select id="mod-rules">
        <option value="">Выберите...</option>
        <option value="yes">Да, принимаю</option>
        <option value="no">Нет</option>
      </select>
    </div>

    <button class="btn btn-primary" onclick="submitModerator()" id="mod-btn" style="background:var(--accent);color:#fff;box-shadow:var(--glow-accent)">
      🛡️ Подать заявку на модератора
    </button>
    <div class="alert" id="mod-alert"></div>
  </div>
</div>

<div id="tab-commands" class="tab">
  <div class="section-title">⚔️ Slash-команды Discord</div>

  <div class="cmd-grid">
    <div class="cmd-card">
      <div class="cmd-name">/help</div>
      <div class="cmd-desc">Показать список всех команд с описанием</div>
      <span class="cmd-example">/help</span>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/ban &lt;user&gt; [reason]</div>
      <div class="cmd-desc">Забанить пользователя (нужно право BanMembers)</div>
      <span class="cmd-example">/ban @нарушитель Реклама</span>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/kick &lt;user&gt; [reason]</div>
      <div class="cmd-desc">Кикнуть пользователя с сервера (нужно KickMembers)</div>
      <span class="cmd-example">/kick @игрок Нарушение правил</span>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/create-role &lt;name&gt; [color]</div>
      <div class="cmd-desc">Создать роль с HEX-цветом (нужно ManageRoles)</div>
      <span class="cmd-example">/create-role VIP #ffd700</span>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/action &lt;user&gt; give_role &lt;role&gt;</div>
      <div class="cmd-desc">Выдать роль пользователю по названию</div>
      <span class="cmd-example">/action @игрок give_role Участник</span>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/action &lt;user&gt; send_message &lt;text&gt;</div>
      <div class="cmd-desc">Отправить личное сообщение пользователю</div>
      <span class="cmd-example">/action @игрок send_message Привет!</span>
    </div>
  </div>

  <br>
  <div class="section-title">📱 Команды Telegram-бота</div>
  <div class="cmd-grid">
    <div class="cmd-card">
      <div class="cmd-name">/start</div>
      <div class="cmd-desc">Запустить бота, показать приветствие</div>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/auth</div>
      <div class="cmd-desc">Авторизоваться через Discord (для модераторов)</div>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/whoami</div>
      <div class="cmd-desc">Показать свой Discord профиль и статус модератора</div>
    </div>
    <div class="cmd-card">
      <div class="cmd-name">/help</div>
      <div class="cmd-desc">Список команд и инструкции</div>
    </div>
  </div>
</div>

<!-- ══════════ О СЕРВЕРЕ ══════════ -->
<div id="tab-about" class="tab">
  <div class="section-title">ℹ️ О сервере</div>

  <div class="card">
    <div class="card-title">🎮 GameVerse Server</div>
    <p style="color:var(--text-muted);margin-bottom:16px">
      GameVerse — это игровое сообщество для тех, кто любит играть, общаться и развиваться.
      Наш сервер работает на Discord с полной системой заявок через сайт и Telegram-модерацией.
    </p>
    <div class="info-block">
      <strong>Хостинг:</strong> Railway (сайт + Discord бот) + BotHost (Telegram бот)<br>
      <strong>База данных:</strong> PostgreSQL (Railway)<br>
      <strong>AI:</strong> GPT-4o-mini (OpenAI)
    </div>
  </div>

  <div class="card">
    <div class="card-title">🛡️ Инструкция для модераторов Telegram</div>
    <p style="color:var(--text-muted);margin-bottom:16px">
      Чтобы принимать/отклонять заявки через Telegram, необходимо авторизоваться:
    </p>
    <ol class="steps">
      <li>Найдите Telegram-бота администрации и напишите <strong>/start</strong></li>
      <li>Введите команду <strong>/auth</strong> — бот пришлёт ссылку для входа</li>
      <li>Нажмите «Войти через Discord» и авторизуйтесь в браузере</li>
      <li>Бот проверит вашу роль на Discord-сервере (Модератор/Admin)</li>
      <li>После подтверждения вы сможете нажимать ✅/❌ на заявках</li>
    </ol>
    <br>
    <p style="color:var(--text-muted);font-size:0.85rem">⚠️ Если у вас нет роли Модератора на Discord-сервере — кнопки будут заблокированы.</p>
  </div>

</div>

</div>
</div>
</main>

<script>
// ─── Темы ───────────────────────────────────────
function setTheme(t, btn) {
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  localStorage.setItem('theme', t);
}
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.querySelector(`.theme-btn[data-t="${saved}"]`);
    if (btn) {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }
})();

// ─── Вкладки ────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
}

// ─── Проверка Discord пользователя ──────────────
const debounceTimers = {};
function debounceCheck(prefix) {
  clearTimeout(debounceTimers[prefix]);
  debounceTimers[prefix] = setTimeout(() => checkDiscordUser(prefix), 700);
}

async function checkDiscordUser(prefix) {
  const input = document.getElementById(prefix + '-username');
  const checkEl = document.getElementById(prefix + '-check');
  const val = input.value.trim();

  if (!val || val.length < 2) {
    checkEl.className = 'discord-check';
    return;
  }

  checkEl.className = 'discord-check loading';
  checkEl.innerHTML = '🔍 Ищем на сервере...';
  checkEl.style.display = 'block';

  try {
    const res = await fetch(`/api/discord/lookup?username=${encodeURIComponent('@' + val.replace('@',''))}`);
    const data = await res.json();

    if (data.found) {
      const rolesHtml = (data.roles || [])
        .slice(0, 4)
        .map(r => `<span class="role-badge" style="border-color:${r.color || '#444'}">${r.name}</span>`)
        .join('');

      checkEl.className = 'discord-check found';
      checkEl.innerHTML = `
        <img class="avatar" src="${data.avatar || ''}" onerror="this.style.display='none'">
        <div class="user-info">
          <div class="uname">✅ ${data.username}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">${data.displayName}</div>
          <div class="roles">${rolesHtml}</div>
        </div>
      `;
      input.dataset.discordId = data.discord_id;
      input.dataset.discordUsername = data.username;
    } else {
      checkEl.className = 'discord-check not-found';
      checkEl.innerHTML = `❌ Пользователь @${val} не найден на сервере Discord. Убедитесь, что вы уже на нём.`;
      checkEl.style.display = 'block';
    }
  } catch {
    checkEl.className = 'discord-check not-found';
    checkEl.innerHTML = '⚠️ Ошибка проверки. Попробуйте позже.';
    checkEl.style.display = 'block';
  }
}

// ─── Отправка заявки на вступление ──────────────
async function submitApply() {
  const btn = document.getElementById('apply-btn');
  const alert = document.getElementById('apply-alert');

  const username = document.getElementById('apply-username').value.trim();
  const age = document.getElementById('apply-age').value;
  const name = document.getElementById('apply-name').value.trim();
  const activity = document.getElementById('apply-activity').value;
  const games = document.getElementById('apply-games').value.trim();
  const rules = document.getElementById('apply-rules').value;

  if (!username || !age || !name || !activity || !rules) {
    showAlert(alert, 'error', '⚠️ Заполните все обязательные поля.');
    return;
  }
  if (rules === 'no') {
    showAlert(alert, 'error', '❌ Вы должны принять правила сервера.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Отправляем...';
  showAlert(alert, 'loading', '⏳ Проверяем данные...');

  try {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        discord_username: '@' + username.replace('@',''),
        age: parseInt(age),
        name, activity, games,
        rules: rules === 'yes',
      }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showAlert(alert, 'success', '✅ Заявка успешно отправлена! Ожидайте решения модераторов.');
      document.getElementById('apply-username').value = '';
      document.getElementById('apply-age').value = '';
      document.getElementById('apply-name').value = '';
      document.getElementById('apply-activity').value = '';
      document.getElementById('apply-games').value = '';
      document.getElementById('apply-rules').value = '';
      document.getElementById('apply-check').className = 'discord-check';
    } else {
      showAlert(alert, 'error', '❌ ' + (data.error || 'Ошибка сервера'));
    }
  } catch {
    showAlert(alert, 'error', '❌ Ошибка сети. Проверьте соединение.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '📤 Отправить заявку';
  }
}

// ─── Отправка заявки куратора ────────────────────
async function submitCurator() {
  const btn = document.getElementById('cur-btn');
  const alert = document.getElementById('cur-alert');

  const username = document.getElementById('cur-username').value.trim();
  const age = document.getElementById('cur-age').value;
  const name = document.getElementById('cur-name').value.trim();
  const activity = document.getElementById('cur-activity').value;
  const games = document.getElementById('cur-games').value.trim();
  const experience = document.getElementById('cur-experience').value.trim();
  const motivation = document.getElementById('cur-motivation').value.trim();
  const rules = document.getElementById('cur-rules').value;

  if (!username || !age || !name || !activity || !experience || !motivation || !rules) {
    showAlert(alert, 'error', '⚠️ Заполните все обязательные поля.');
    return;
  }
  if (rules === 'no') {
    showAlert(alert, 'error', '❌ Вы должны принять правила сервера.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Отправляем...';
  showAlert(alert, 'loading', '⏳ Отправляем заявку...');

  try {
    const res = await fetch('/api/curator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        discord_username: '@' + username.replace('@',''),
        age: parseInt(age), name, activity, games,
        experience, motivation, rules: rules === 'yes',
      }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showAlert(alert, 'success', '✅ Заявка на куратора отправлена! Администрация рассмотрит её в ближайшее время.');
    } else {
      showAlert(alert, 'error', '❌ ' + (data.error || 'Ошибка сервера'));
    }
  } catch {
    showAlert(alert, 'error', '❌ Ошибка сети.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '👑 Подать заявку на куратора';
  }
}

// ─── AI-чат ─────────────────────────────────────
const chatHistory = [];

async function sendChat() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const text = input.value.trim();
  if (!text) return;

  // Добавить сообщение пользователя
  addChatMessage('user', text, '👤');
  chatHistory.push({ role: 'user', content: text });
  input.value = '';
  sendBtn.disabled = true;

  // Показать "печатает..."
  const typingEl = showTyping();

  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory }),
    });
    const data = await res.json();
    typingEl.remove();

    const reply = data.reply || '❌ Нет ответа';
    addChatMessage('bot', reply, '🤖');
    chatHistory.push({ role: 'assistant', content: reply });
  } catch {
    typingEl.remove();
    addChatMessage('bot', '❌ Ошибка соединения. Попробуйте позже.', '🤖');
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

function addChatMessage(role, text, avatar) {
  const window = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `
    <div class="chat-avatar ${role}">${avatar}</div>
    <div class="chat-bubble">${escapeHtml(text)}</div>
  `;
  window.appendChild(div);
  window.scrollTop = window.scrollHeight;
}

function showTyping() {
  const window = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="chat-avatar bot">🤖</div>
    <div class="chat-typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
  `;
  window.appendChild(div);
  window.scrollTop = window.scrollHeight;
  return div;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

// ─── Утилиты ────────────────────────────────────
function showAlert(el, type, msg) {
  el.className = 'alert ' + type;
  el.textContent = msg;
}

// ─── Отправка заявки модератора ──────────────────
async function submitModerator() {
  const btn = document.getElementById('mod-btn');
  const alert = document.getElementById('mod-alert');

  const username   = document.getElementById('mod-username').value.trim();
  const age        = document.getElementById('mod-age').value;
  const name       = document.getElementById('mod-name').value.trim();
  const activity   = document.getElementById('mod-activity').value;
  const timezone   = document.getElementById('mod-timezone').value;
  const experience = document.getElementById('mod-experience').value.trim();
  const situation  = document.getElementById('mod-situation').value.trim();
  const motivation = document.getElementById('mod-motivation').value.trim();
  const nitro      = document.getElementById('mod-nitro').value;
  const rules      = document.getElementById('mod-rules').value;

  if (!username || !age || !name || !activity || !timezone || !experience || !situation || !motivation || !rules) {
    showAlert(alert, 'error', '⚠️ Заполните все обязательные поля.');
    return;
  }
  if (rules === 'no') {
    showAlert(alert, 'error', '❌ Вы должны принять правила и обязанности модератора.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Отправляем...';
  showAlert(alert, 'loading', '⏳ Проверяем данные...');

  try {
    const res = await fetch('/api/moderator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        discord_username: '@' + username.replace('@',''),
        age: parseInt(age), name, activity, timezone,
        experience, situation, motivation, nitro,
        rules: true,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showAlert(alert, 'success', '✅ Заявка на модератора отправлена! Администрация рассмотрит её в ближайшее время.');
      ['mod-username','mod-age','mod-name','mod-experience','mod-situation','mod-motivation']
        .forEach(id => document.getElementById(id).value = '');
      ['mod-activity','mod-timezone','mod-nitro','mod-rules']
        .forEach(id => document.getElementById(id).value = id === 'mod-nitro' ? 'no' : '');
      document.getElementById('mod-check').className = 'discord-check';
    } else {
      showAlert(alert, 'error', '❌ ' + (data.error || 'Ошибка сервера'));
    }
  } catch {
    showAlert(alert, 'error', '❌ Ошибка сети. Проверьте соединение.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🛡️ Подать заявку на модератора';
  }
}

</script>
</body>
</html>
