import { determineQueryStatus } from "@/src/hooks/api/useQueryStatus";
import { type MovieSummary } from "@/src/lib/api/types";
import { useRouter } from "expo-router";
import { useRefresh } from "../../../hooks/api/useRefresh";
import {
  useFeaturedMoviesQuery,
  usePopularMoviesQuery,
  useTrendingMoviesQuery,
} from "./useMovies";

export type HomeScreenData = {
  featured: MovieSummary[];
  trending: MovieSummary[];
  popular: MovieSummary[];
};

export function useHomeScreen() {
  const router = useRouter();

  const {
    data: featuredMovies,
    isLoading: featuredLoading,
    error: featuredError,
    refetch: refetchFeatured,
  } = useFeaturedMoviesQuery();

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingMoviesQuery();

  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError,
    refetch: refetchPopular,
  } = usePopularMoviesQuery();

  const { refreshing, handleRefresh } = useRefresh(async () => {
    await Promise.all([refetchFeatured(), refetchTrending(), refetchPopular()]);
  });

  const handleMoviePress = (movie: MovieSummary) => {
    router.push(`/(stack)/movie/${movie.imdbID}`);
  };

  const status = determineQueryStatus([
    { isLoading: featuredLoading, error: featuredError, data: featuredMovies },
    { isLoading: trendingLoading, error: trendingError, data: trendingMovies },
    { isLoading: popularLoading, error: popularError, data: popularMovies },
  ]);

  function dedupeMoviesById(movies: MovieSummary[]): MovieSummary[] {
    const seen = new Set<string>();
    const result: MovieSummary[] = [];
    for (const movie of movies) {
      if (!seen.has(movie.imdbID)) {
        seen.add(movie.imdbID);
        result.push(movie);
      }
    }
    return result;
  }

  const featuredUnique = dedupeMoviesById(featuredMovies ?? []);
  const trendingUnique = dedupeMoviesById(trendingMovies ?? []);
  const popularUnique = dedupeMoviesById(popularMovies ?? []);

  const trendingFiltered = trendingUnique.filter(
    (movie) => !featuredUnique.some((f) => f.imdbID === movie.imdbID)
  );

  const popularFiltered = popularUnique.filter((movie) => {
    const isInFeatured = featuredUnique.some((f) => f.imdbID === movie.imdbID);
    const isInTrending = trendingFiltered.some(
      (t) => t.imdbID === movie.imdbID
    );
    return !isInFeatured && !isInTrending;
  });

  console.log({ popularFiltered });

  const data: HomeScreenData | undefined =
    status === "success"
      ? {
          featured: featuredUnique,
          trending: trendingFiltered,
          popular: popularFiltered,
        }
      : undefined;

  return {
    status,
    data,
    refreshing,
    handleRefresh,
    handleMoviePress,
  };
}
