import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../lib/theme/colors";
import { IconSymbol } from "@/src/ui/icons/IconSymbol";
import { ThemedText } from "@/src/ui/primitives/ThemedText";
import { ThemedView } from "@/src/ui/primitives/ThemedView";

type EmptyStateProps = {
  title?: string;
  message?: string;
  style?: ViewStyle;
};

export function EmptyState({
  title = "Nothing here",
  message = "We couldn't find any content to show.",
  style,
}: EmptyStateProps) {
  return (
    <ThemedView style={[styles.container, style]}>
      <IconSymbol name="film" size={26} color={Colors.icon} />
      <ThemedText type="subheading" style={styles.title}>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText style={styles.message}>{message}</ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    opacity: 0.85,
  },
});
