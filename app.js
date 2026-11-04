const STORAGE_KEY = "rep-rampage-save-v2";
const ENEMIES = [
  { name: "Forest Sentinel", symbol: "♜", maxHp: 100, level: 1 },
  { name: "Corrupted Wolf", symbol: "狼", maxHp: 120, level: 2 },
  { name: "Mossbound Guardian", symbol: "♟", maxHp: 145, level: 3 },
  { name: "Hollow Knight", symbol: "⚔", maxHp: 175, level: 4 }
];
const defaultSave = {
  xp: 0, coins: 0, quests: 0, sessions: [], streak: 0, wins: 0,
  heroHp: 100, enemyIndex: 0, enemyHp: 100, lastQuestDate: "",
  lastTrainingDate: "", activeDays: []
};
let save = loadSave();

function loadSave() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const merged = { ...defaultSave, ...stored };
    if (!Array.isArray(merged.sessions)) merged.sessions = [];
    if (!Array.isArray(merged.activeDays)) merged.activeDays = [];
    const enemy = ENEMIES[merged.enemyIndex % ENEMIES.length];
    const savedEnemyHp = Number(merged.enemyHp);
    const savedHeroHp = Number(merged.heroHp);
    merged.enemyHp = Math.max(0, Math.min(enemy.maxHp, Number.isFinite(savedEnemyHp) ? savedEnemyHp : enemy.maxHp));
    merged.heroHp = Math.max(0, Math.min(100, Number.isFinite(savedHeroHp) ? savedHeroHp : 100));
    return merged;
  } catch {
    return { ...defaultSave };
  }
}
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); }
  catch (error) { console.warn("Could not save game progress:", error); }
  renderStats();
}
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}
function levelInfo() {
  const level = Math.floor(save.xp / 100) + 1;
  return { level, into: save.xp % 100 };
}
function currentEnemy() { return ENEMIES[save.enemyIndex % ENEMIES.length]; }
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
function setBar(id, value, max) {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.max(0, Math.min(100, value / max * 100)) + "%";
}
function renderStats() {
  const { level, into } = levelInfo();
  setText("coin-count", save.coins);
  setText("level-count", level);
  setText("xp-count", save.xp);
  setText("streak-count", save.activeDays.length + (save.activeDays.length === 1 ? " day" : " days"));
  setText("quest-count", save.quests);
  setText("progress-xp", save.xp);
  setText("progress-sessions", save.sessions.length);
  setText("profile-level", level);
  setText("profile-xp", into + " / 100 XP");
  setText("battle-progress-label", into + " / 100 XP");
  setBar("profile-progress", into, 100);
  setBar("battle-progress", into, 100);

  const enemy = currentEnemy();
  setText("enemy-level", enemy.level);
  setText("enemy-hp-label", save.enemyHp + " / " + enemy.maxHp + " HP");
  setText("hero-hp-label", save.heroHp + " / 100 HP");
  setBar("enemy-hp-bar", save.enemyHp, enemy.maxHp);
  setBar("hero-hp-bar", save.heroHp, 100);
  setText("battle-wins", save.wins);
  setText("battle-coins", save.coins);
  renderHistory();
  renderQuest();
}
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("active", screen.id === name + "-screen"));
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("selected", button.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.screen)));
document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.go)));

function renderQuest() {
  const button = document.getElementById("quest-button");
  if (!button) return;
  const completed = save.lastQuestDate === localDateKey();
  button.disabled = completed;
  button.textContent = completed ? "TODAY'S QUEST COMPLETED ✓" : "COMPLETE A SESSION TO CLAIM";
}
function renderHistory() {
  const list = document.getElementById("history-list");
  if (!list) return;
  if (!save.sessions.length) {
    list.innerHTML = '<p class="muted">Your completed sessions will appear here.</p>';
    return;
  }
  list.innerHTML = save.sessions.slice(0, 8).map(item =>
    '<div class="history-item"><span>' + item.date + ' · ' + item.variation + ' · ' + item.reps + ' reps logged</span><span>+' + item.xp + ' XP</span></div>'
  ).join("");
}

const repInput = document.getElementById("rep-input");
document.getElementById("minus-reps").addEventListener("click", () => {
  repInput.value = Math.max(0, Number(repInput.value || 0) - 1);
});
document.getElementById("plus-reps").addEventListener("click", () => {
  repInput.value = Math.min(100, Number(repInput.value || 0) + 1);
});

document.getElementById("log-workout").addEventListener("click", () => {
  const reps = Math.floor(Number(repInput.value));
  const message = document.getElementById("training-message");
  if (!Number.isFinite(reps) || reps < 1 || reps > 100) {
    message.textContent = "Enter a session total from 1 to 100 reps.";
    return;
  }

  const today = localDateKey();
  const variation = document.getElementById("variation-select").value;
  const enemy = currentEnemy();
  const damage = 25;
  const counterDamage = 8;
  let battleMessage = "You landed a hit on " + enemy.name + " for " + damage + " damage.";
  save.sessions.unshift({
    reps, variation, date: new Date().toLocaleDateString(), xp: 20, createdAt: new Date().toISOString()
  });
  save.xp += 20;
  save.coins += 5;
  save.enemyHp = Math.max(0, save.enemyHp - damage);

  if (save.enemyHp === 0) {
    save.wins += 1;
    save.xp += 30;
    save.coins += 15;
    battleMessage = enemy.name + " defeated! Victory rewards: +30 XP and +15 coins.";
    save.enemyIndex = (save.enemyIndex + 1) % ENEMIES.length;
    save.enemyHp = currentEnemy().maxHp;
  } else {
    save.heroHp = Math.max(0, save.heroHp - counterDamage);
    if (save.heroHp === 0) {
      battleMessage += " Your hero needs recovery. Your next training day restores hero vitality.";
    } else {
      battleMessage += " The enemy countered for " + counterDamage + " hero vitality.";
    }
  }

  if (!save.activeDays.includes(today)) save.activeDays.push(today);
  save.lastTrainingDate = today;
  if (save.lastQuestDate !== today) {
    save.lastQuestDate = today;
    save.quests += 1;
    save.xp += 50;
    save.coins += 10;
    message.textContent = "Session logged. Daily quest complete: +20 XP, +50 quest XP and +15 coins.";
  } else {
    message.textContent = "Session logged. +20 XP and +5 coins. Nice work.";
  }
  setText("battle-log", battleMessage);

  const priorDay = new Date(today + "T12:00:00");
  priorDay.setDate(priorDay.getDate() - 1);
  persist();
  repInput.value = 5;
});

document.getElementById("rest-button").addEventListener("click", () => {
  save.heroHp = 100;
  persist();
  setText("battle-log", "Your hero has recovered fully. Take your time between real training sessions.");
  setText("rest-message", "Hero vitality restored to 100. No XP or coins were spent.");
});

document.getElementById("quest-button").addEventListener("click", () => {
  const message = document.getElementById("training-message");
  message.textContent = "Complete a training session to finish today's quest. No extra grind required.";
  showScreen("training");
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(error => console.info("Offline support unavailable:", error)));
}
renderStats();
