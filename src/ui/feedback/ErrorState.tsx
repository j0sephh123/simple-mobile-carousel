import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../lib/theme/colors";
import { IconSymbol } from "../icons/IconSymbol";
import { ThemedText } from "../primitives/ThemedText";
import { ThemedView } from "../primitives/ThemedView";

type ErrorStateProps = {
  title?: string;
  message?: string;
  actionText?: string;
  onRetry?: () => void;
  style?: ViewStyle;
};

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  actionText = "Retry",
  onRetry,
  style,
}: ErrorStateProps) {
  return (
    <ThemedView style={[styles.container, style]}>
      <IconSymbol
        name="exclamationmark.triangle.fill"
        size={28}
        color={Colors.tint}
      />
      <ThemedText type="subheading" style={styles.title}>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText style={styles.message}>{message}</ThemedText>
      ) : null}
      {onRetry ? (
        <ThemedView style={styles.button} onTouchEnd={onRetry}>
          <ThemedText style={styles.buttonText}>{actionText}</ThemedText>
        </ThemedView>
      ) : null}
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
  button: {
    marginTop: 8,
    backgroundColor: Colors.tint,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: "Inter-Medium",
  },
});
