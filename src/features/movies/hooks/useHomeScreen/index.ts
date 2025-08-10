import { determineQueryStatus } from "@/src/hooks/api/useQueryStatus";
import { type MovieSummary } from "@/src/lib/api/types";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  useFeaturedMoviesQuery,
  usePopularMoviesQuery,
  useTrendingMoviesQuery,
} from "../useMovies";
import { useHomeRefresh } from "./refresh";
import { computeHomeLists } from "./selectors";
import { type HomeScreenData } from "./types";
export type { HomeScreenData } from "./types";

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

  const { refreshing, handleRefresh } = useHomeRefresh(
    refetchFeatured,
    refetchTrending,
    refetchPopular
  );

  const handleMoviePress = useCallback(
    (movie: MovieSummary) => {
      router.push(`/(stack)/movie/${movie.imdbID}`);
    },
    [router]
  );

  const status = determineQueryStatus([
    { isLoading: featuredLoading, error: featuredError, data: featuredMovies },
    { isLoading: trendingLoading, error: trendingError, data: trendingMovies },
    { isLoading: popularLoading, error: popularError, data: popularMovies },
  ]);

  const { featuredUnique, trendingFiltered, popularFiltered } = useMemo(
    () => computeHomeLists(featuredMovies, trendingMovies, popularMovies),
    [featuredMovies, trendingMovies, popularMovies]
  );

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
