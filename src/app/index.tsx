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
import useInterview from "./interview/interview";

const ExpoSettings = requireNativeModule("ExpoSettings");

export default function HomeScreen() {
  // Hooks
  const [count, setCount] = useState(0);
  const [value, setValue] = useState<string | undefined>("");
  useInterview();
  useEffect(() => {
    {
      (function () {
        var name = "aman";
        console.log("Immediate invote function");
      })();
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

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <TouchableOpacity onPress={handleSaveValue}>
          <Text>Save Value {value}</Text>
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
});
