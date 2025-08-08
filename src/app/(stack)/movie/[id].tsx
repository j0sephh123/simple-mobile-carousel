import { QueryState } from "@/src/features/common/QueryState";
import { MovieDetails, MovieHero, useMovieDetails } from "@/src/features/movie";
import { MovieDetail } from "@/src/lib/api/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { status, movie, refetch } = useMovieDetails(id);

  return (
    <QueryState<MovieDetail>
      status={status}
      data={movie}
      onRetry={refetch}
      headerTitle={{
        loading: "Loading",
        offline: "Connection Error",
        error: "Error",
        empty: "Not found",
        success: ({ Title }) => Title,
      }}
    >
      {(movie) => (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <MovieHero
            Title={movie.Title}
            Poster={movie.Poster}
            imdbRating={movie.imdbRating}
            Year={movie.Year}
            Runtime={movie.Runtime}
            Rated={movie.Rated}
          />
          <MovieDetails Plot={movie.Plot} Genre={movie.Genre} />
        </ScrollView>
      )}
    </QueryState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
