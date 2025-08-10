import { MovieSummary } from "@/src/lib/api/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";

type Props = {
  movie: MovieSummary;
};

export function PlaceholderImage({ movie }: Props) {
  return (
    <View style={styles.fallbackBackground}>
      <View style={styles.fallbackIcon}>
        <ThemedText style={styles.fallbackIconText}>🎬</ThemedText>
      </View>
      <ThemedText style={styles.fallbackTitle} numberOfLines={2}>
        {movie.Title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  fallbackBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  fallbackIcon: {
    marginBottom: 20,
  },
  fallbackIconText: {
    fontSize: 48,
  },
  fallbackTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 28,
  },
});
