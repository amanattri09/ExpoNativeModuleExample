import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { requireNativeModule } from "expo-modules-core";
import { useEffect, useState } from "react";
import List from "./components/List";
import useInterview from "./interview/alogrithim/stringsandarray";
import ApiServicesDemo from "./interview/api-services/ApiServicesDemo";
import useMoneyGramInterview from "./interviewMoneyGram/MoneygramInterview";

const ExpoSettings = requireNativeModule("ExpoSettings");

export default function HomeScreen() {
  // Hooks
  const [count, setCount] = useState(0);
  const [value, setValue] = useState<string | undefined>("");
  const [activeScreen, setActiveScreen] = useState<"home" | "api-services">(
    "home",
  );

  useInterview();
  useMoneyGramInterview();

  useEffect(() => {
    {
      getValue();
    }
  }, []);

  // Handlers

  const handleSaveValue = async () => {
    setCount((prev) => prev + 1);
    await ExpoSettings.setValue("count", count.toString());
    getValue();
  };

  async function getValue() {
    // set value from native module
    setValue(await ExpoSettings.getValue("count"));
  }

  if (activeScreen === "api-services") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#11111b" }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveScreen("home")}
        >
          <Text style={{ color: "#cdd6f4", fontWeight: "bold" }}>
            ← Back to Native Module Home
          </Text>
        </TouchableOpacity>
        <ApiServicesDemo />
      </SafeAreaView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#f9e2af" }]}
          onPress={() => setActiveScreen("api-services")}
        >
          <Text style={{ color: "#11111b", fontWeight: "bold" }}>
            API Abstraction & Reusable Services
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSaveValue} style={{ marginTop: 10 }}>
          <Text style={{ color: "#bac2de" }}>Save Value {value}</Text>
        </TouchableOpacity>

        <List>
          <List.header title="List Header" />
          <List.item title="Item 1" />
          <List.item title="Item 2" />
          <List.item title="Item 3" />
        </List>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  navButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  backButton: {
    padding: 12,
    backgroundColor: "#313244",
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
