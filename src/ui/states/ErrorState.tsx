import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../lib/theme/colors";
import { IconSymbol } from "@/src/ui/icons/IconSymbol";
import { ThemedText } from "@/src/ui/primitives/ThemedText";
import { ThemedView } from "@/src/ui/primitives/ThemedView";

export function ErrorState() {
  return (
    <ThemedView style={styles.container}>
      <IconSymbol
        name="exclamationmark.triangle.fill"
        size={28}
        color={Colors.tint}
      />
      <ThemedText type="subheading" style={styles.title}>
        Something went wrong
      </ThemedText>
      <ThemedText style={styles.message}>Please try again.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 10,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    opacity: 0.85,
  },
});
