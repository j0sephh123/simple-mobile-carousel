import { MovieDetail } from "@/src/lib/api";
import { Colors } from "@/src/lib/theme/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";

type Props = {
  rating: MovieDetail["imdbRating"];
};

export function RatingBadge({ rating }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>⭐ {rating}/10</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.tint,
  },
});
