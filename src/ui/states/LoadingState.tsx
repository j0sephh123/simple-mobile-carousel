import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../lib/theme/colors";
import { ThemedView } from "@/src/ui/primitives/ThemedView";
import { ThemedText } from "@/src/ui/primitives/ThemedText";

type LoadingProps = {
  message?: string;
};

export function LoadingState({ message }: LoadingProps) {
  return (
    <ThemedView style={styles.fullscreen}>
      <ActivityIndicator size="large" color={Colors.tint} />
      {message ? (
        <ThemedText style={styles.message} type="body">
          {message}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    marginTop: 12,
    opacity: 0.85,
  },
});
