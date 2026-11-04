import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { starterPlayer, starterQuest } from "./gameData";

type Tab = "Home" | "Battle" | "Training" | "Character" | "Progress";
const GOLD = "#D7AD62";
const MUTED = "#A9A39A";
const PANEL = "#201F22";
const BG = "#111114";

export default function RepRampageHome() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [questReady, setQuestReady] = useState(false);
  const tabs: Tab[] = ["Home", "Battle", "Training", "Character", "Progress"];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <View style={s.screen}>
        <ScrollView contentContainerStyle={s.content}>
          <View style={s.top}>
            <View>
              <Text style={s.eyebrow}>THE REALM AWAITS</Text>
              <Text style={s.logo}>REP <Text style={s.gold}>RAMPAGE</Text></Text>
            </View>
            <View style={s.coins}><Text style={s.coinText}>✦ {starterPlayer.coins}</Text></View>
          </View>

          {activeTab === "Home" ? (
            <>
              <View style={s.hero}>
                <Text style={s.eyebrow}>YOUR ADVENTURE</Text>
                <Text style={s.heroTitle}>Rise, {starterPlayer.name}.</Text>
                <Text style={s.body}>A new path opens in the Forgotten Forest.</Text>
                <View style={s.playerRow}>
                  <View style={s.avatar}><Text style={s.avatarText}>✧</Text></View>
                  <View style={s.playerInfo}>
                    <Text style={s.playerName}>LVL {starterPlayer.level} · {starterPlayer.title}</Text>
                    <View style={s.xpTrack}><View style={s.xpFill} /></View>
                    <Text style={s.small}>{starterPlayer.xp} / {starterPlayer.xpToNextLevel} XP</Text>
                  </View>
                </View>
              </View>

              <View style={s.heading}><Text style={s.section}>ACTIVE QUEST</Text><Text style={s.small}>01 / 05</Text></View>
              <View style={s.quest}>
                <View style={s.questIcon}><Text style={s.questSymbol}>✦</Text></View>
                <View style={s.questCopy}>
                  <Text style={s.questTitle}>{starterQuest.title}</Text>
                  <Text style={s.body}>{starterQuest.description}</Text>
                  <Text style={s.reward}>✦ {starterQuest.rewardXp} XP REWARD</Text>
                </View>
              </View>

              <View style={s.heading}><Text style={s.section}>YOUR NEXT ENCOUNTER</Text><Text style={s.small}>FOREST PATH</Text></View>
              <View style={s.encounter}>
                <View style={s.encounterTop}>
                  <View><Text style={s.encounterName}>Forest Sentinel</Text><Text style={s.small}>GUARDIAN · BEGINNER</Text></View>
                  <Text style={s.leaf}>❖</Text>
                </View>
                <View style={s.hpTrack}><View style={s.hpFill} /></View>
                <Text style={s.small}>Progress is saved between sessions.</Text>
              </View>

              <TouchableOpacity style={s.primary} onPress={() => setQuestReady(!questReady)}>
                <Text style={s.primaryText}>{questReady ? "QUEST READY — VIEW TRAINING" : "BEGIN YOUR JOURNEY  →"}</Text>
              </TouchableOpacity>
              {questReady ? <Text style={s.note}>Your quest is ready. Choose a comfortable session in Training when you are ready.</Text> : null}

              <View style={s.stats}>
                <Stat label="STREAK" value={starterPlayer.streak + " DAYS"} />
                <Stat label="LEVEL" value={String(starterPlayer.level)} />
                <Stat label="COINS" value={String(starterPlayer.coins)} />
              </View>
            </>
          ) : (
            <View style={s.placeholder}>
              <Text style={s.eyebrow}>COMING INTO VIEW</Text>
              <Text style={s.heroTitle}>{activeTab}</Text>
              <Text style={s.body}>This part of the realm is on our build list. The Home screen is our first UI milestone.</Text>
              <TouchableOpacity style={s.secondary} onPress={() => setActiveTab("Home")}>
                <Text style={s.secondaryText}>RETURN HOME</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View style={s.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} style={s.tab} onPress={() => setActiveTab(tab)} accessibilityRole="button">
              <Text style={[s.tabText, activeTab === tab && s.tabActive]}>{tab}</Text>
              {activeTab === tab ? <View style={s.indicator} /> : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <View style={s.stat}><Text style={s.small}>{label}</Text><Text style={s.statValue}>{value}</Text></View>;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  screen: { flex: 1, backgroundColor: BG },
  content: { padding: 20, paddingBottom: 28 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  eyebrow: { color: GOLD, fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  logo: { color: "#F3EFE7", fontSize: 21, fontWeight: "900", letterSpacing: 1.2, marginTop: 5 },
  gold: { color: GOLD },
  coins: { borderWidth: 1, borderColor: "#59472B", backgroundColor: "#28231B", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  coinText: { color: GOLD, fontWeight: "800" },
  hero: { backgroundColor: "#29251F", borderColor: "#65502E", borderWidth: 1, borderRadius: 18, padding: 18, marginBottom: 24 },
  heroTitle: { color: "#F4F0E8", fontSize: 27, fontWeight: "900", marginTop: 8, marginBottom: 6 },
  body: { color: MUTED, fontSize: 13, lineHeight: 19 },
  playerRow: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  avatar: { width: 54, height: 54, borderRadius: 14, backgroundColor: "#403521", borderWidth: 1, borderColor: GOLD, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 27, color: GOLD },
  playerInfo: { flex: 1, marginLeft: 13 },
  playerName: { color: "#F3EFE7", fontSize: 12, fontWeight: "800", marginBottom: 8 },
  xpTrack: { height: 7, borderRadius: 5, backgroundColor: "#514A3F", overflow: "hidden" },
  xpFill: { width: "40%", height: "100%", backgroundColor: GOLD, borderRadius: 5 },
  small: { color: MUTED, fontSize: 10, marginTop: 6 },
  heading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  section: { color: "#E9E2D5", fontSize: 11, fontWeight: "900", letterSpacing: 1.4 },
  quest: { flexDirection: "row", backgroundColor: PANEL, borderRadius: 14, borderWidth: 1, borderColor: "#3B3730", padding: 14, marginBottom: 23 },
  questIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#3B3020", alignItems: "center", justifyContent: "center" },
  questSymbol: { color: GOLD, fontSize: 25 },
  questCopy: { flex: 1, marginLeft: 12 },
  questTitle: { color: "#F3EFE7", fontSize: 15, fontWeight: "800", marginBottom: 4 },
  reward: { color: GOLD, fontSize: 10, fontWeight: "900", letterSpacing: 1, marginTop: 8 },
  encounter: { backgroundColor: PANEL, borderRadius: 14, borderWidth: 1, borderColor: "#3B3730", padding: 15, marginBottom: 18 },
  encounterTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  encounterName: { color: "#F3EFE7", fontSize: 16, fontWeight: "800" },
  leaf: { color: "#A6A36D", fontSize: 28 },
  hpTrack: { height: 8, borderRadius: 5, backgroundColor: "#493333", overflow: "hidden", marginBottom: 6 },
  hpFill: { width: "72%", height: "100%", backgroundColor: "#B45B50" },
  primary: { backgroundColor: GOLD, borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 8 },
  primaryText: { color: "#1B1711", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  note: { color: "#C6B58E", fontSize: 11, lineHeight: 16, marginBottom: 12, textAlign: "center" },
  stats: { flexDirection: "row", gap: 9, marginTop: 14 },
  stat: { flex: 1, backgroundColor: PANEL, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#37332D" },
  statValue: { color: GOLD, fontWeight: "900", fontSize: 15, marginTop: 4 },
  placeholder: { minHeight: 380, justifyContent: "center", backgroundColor: PANEL, borderRadius: 18, padding: 22, borderWidth: 1, borderColor: "#3B3730" },
  secondary: { borderWidth: 1, borderColor: GOLD, borderRadius: 10, padding: 13, alignItems: "center", marginTop: 20 },
  secondaryText: { color: GOLD, fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  tabs: { flexDirection: "row", backgroundColor: "#19191C", borderTopWidth: 1, borderTopColor: "#343136", paddingTop: 12, paddingBottom: 10 },
  tab: { flex: 1, alignItems: "center", minHeight: 34 },
  tabText: { color: "#77737A", fontSize: 9, fontWeight: "700" },
  tabActive: { color: GOLD },
  indicator: { width: 16, height: 2, backgroundColor: GOLD, borderRadius: 2, marginTop: 6 },
});