const STORAGE_KEY = "rep-rampage-save-v1";
const defaultSave = { xp: 0, coins: 0, quests: 0, sessions: [], streak: 0 };
let save = loadSave();

function loadSave() {
  try { return { ...defaultSave, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return { ...defaultSave }; }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); renderStats(); }
function levelInfo() { const level = Math.floor(save.xp / 100) + 1; return { level, into: save.xp % 100 }; }
function renderStats() {
  const { level, into } = levelInfo();
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  set("coin-count", save.coins); set("level-count", level); set("xp-count", save.xp);
  set("streak-count", save.streak + (save.streak === 1 ? " day" : " days"));
  set("quest-count", save.quests); set("progress-xp", save.xp); set("progress-sessions", save.sessions.length);
  set("profile-level", level); set("profile-xp", `${into} / 100 XP`);
  set("battle-progress-label", `${into} / 100 XP`);
  ["profile-progress", "battle-progress"].forEach(id => { const el = document.getElementById(id); if (el) el.style.width = into + "%"; });
  renderHistory();
}
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("active", screen.id === name + "-screen"));
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("selected", button.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.screen)));
document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.go)));

const repInput = document.getElementById("rep-input");
document.getElementById("minus-reps").addEventListener("click", () => repInput.value = Math.max(0, Number(repInput.value || 0) - 1));
document.getElementById("plus-reps").addEventListener("click", () => repInput.value = Math.min(100, Number(repInput.value || 0) + 1));
document.getElementById("log-workout").addEventListener("click", () => {
  const reps = Math.max(0, Math.min(100, Math.floor(Number(repInput.value))));
  const message = document.getElementById("training-message");
  if (!Number.isFinite(reps) || reps < 1) { message.textContent = "Enter at least 1 rep to log a session."; return; }
  save.sessions.unshift({ reps, date: new Date().toLocaleDateString(), xp: 20 });
  save.xp += 20; save.coins += 5;
  persist();
  message.textContent = "Session logged. +20 XP · +5 coins. Nice work!";
  repInput.value = 5;
});
function renderHistory() {
  const list = document.getElementById("history-list");
  if (!list) return;
  if (!save.sessions.length) { list.innerHTML = '<p class="muted">Your completed sessions will appear here.</p>'; return; }
  list.innerHTML = save.sessions.slice(0, 8).map(item => `<div class="history-item"><span>${item.date} · ${item.reps} reps logged</span><span>+${item.xp} XP</span></div>`).join("");
}
document.getElementById("quest-button").addEventListener("click", event => {
  if (event.currentTarget.dataset.done === "true") return;
  save.xp += 50; save.coins += 10; save.quests += 1;
  event.currentTarget.dataset.done = "true";
  event.currentTarget.textContent = "QUEST COMPLETED ✓";
  event.currentTarget.disabled = true;
  persist();
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(error => console.info("Offline support unavailable:", error)));
}
renderStats();