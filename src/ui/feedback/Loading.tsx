import React from "react";
import { ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../lib/theme/colors";
import { ThemedText } from "../primitives/ThemedText";
import { ThemedView } from "../primitives/ThemedView";

type LoadingProps = {
  message?: string;
  fullscreen?: boolean;
  size?: "small" | "large";
  style?: ViewStyle;
};

export function Loading({
  message,
  fullscreen = false,
  size = "large",
  style,
}: LoadingProps) {
  return (
    <ThemedView style={[fullscreen ? styles.fullscreen : styles.inline, style]}>
      <ActivityIndicator size={size} color={Colors.tint} />
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
  inline: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  message: {
    marginTop: 12,
    opacity: 0.85,
  },
});
