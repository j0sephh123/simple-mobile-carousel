import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/src/lib/api";

interface MovieListProps {
  title?: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  size?: "small" | "medium" | "large";
  horizontal?: boolean;
}

export const MovieList = ({
  title,
  movies,
  onMoviePress,
  size = "medium",
  horizontal = true,
}: MovieListProps) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  const renderMovie = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} size={size} />
  );

  const keyExtractor = (item: Movie) => item.imdbID;

  return (
    <ThemedView style={styles.container}>
      {title && typeof title === "string" && title.trim().length > 0 ? (
        <ThemedText style={styles.title} type="subheading">
          {title}
        </ThemedText>
      ) : null}
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={keyExtractor}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  separator: {
    width: 8,
  },
});
