import { MovieSummary } from "@/src/lib/api/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { MovieList } from "./MovieList";

type Props = {
  title: string;
  movies: MovieSummary[];
  onPress: (movie: MovieSummary) => void;
  size?: "medium" | "large";
  collectionKey?: string;
};

export function MovieRow({
  title,
  movies,
  onPress,
  size = "medium",
  collectionKey,
}: Props) {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="subheading">
        {title}
      </ThemedText>
      <MovieList
        movies={movies}
        onMoviePress={onPress}
        size={size}
        collectionKey={collectionKey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
