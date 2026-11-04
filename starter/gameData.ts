export type PlayerProfile = { name: string; level: number; title: string; xp: number; xpToNextLevel: number; coins: number; streak: number };
export type Quest = { id: string; title: string; description: string; rewardXp: number; status: "available" | "in-progress" | "complete" };

export const starterPlayer: PlayerProfile = {
  name: "Wanderer", level: 1, title: "Recruit", xp: 120, xpToNextLevel: 300, coins: 45, streak: 3,
};

export const starterQuest: Quest = {
  id: "first-steps", title: "The First Steps",
  description: "Complete a comfortable, planned training session.",
  rewardXp: 80, status: "available",
};

export const regions = [
  { id: "forgotten-forest", name: "Forgotten Forest", state: "unlocked" },
  { id: "hollow-crypt", name: "Hollow Crypt", state: "locked" },
  { id: "ashen-kingdom", name: "Ashen Kingdom", state: "locked" },
  { id: "frozen-dominion", name: "Frozen Dominion", state: "locked" },
  { id: "shadow-realm", name: "Shadow Realm", state: "locked" },
] as const;