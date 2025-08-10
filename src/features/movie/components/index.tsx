import { MovieDetail } from "@/src/lib/api/types";
import { MovieDetails } from "./MovieDetails";
import { MovieHero } from "./MovieHero";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

type MovieViewProps = {
  movie: MovieDetail;
  refreshing: boolean;
  handleRefresh: () => void;
};

export default function MovieView({
  movie,
  refreshing,
  handleRefresh,
}: MovieViewProps) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
