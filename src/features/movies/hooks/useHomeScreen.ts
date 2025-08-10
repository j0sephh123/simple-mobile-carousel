import { Movie } from "@/src/lib/api";
import { useRouter } from "expo-router";
import { usePopularMoviesQuery, useTrendingMoviesQuery } from "./useMovies";
import { useRefresh } from "../../../hooks/api/useRefresh";
import { determineQueryStatus } from "@/src/hooks/api/useQueryStatus";

export type HomeScreenData = {
  trending: Movie[];
  popular: Movie[];
};

export function useHomeScreen() {
  const router = useRouter();

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
    await Promise.all([refetchTrending(), refetchPopular()]);
  });

  const handleMoviePress = (movie: Movie) => {
    router.push(`/(stack)/movie/${movie.imdbID}`);
  };

  const status = determineQueryStatus([
    { isLoading: trendingLoading, error: trendingError, data: trendingMovies },
    { isLoading: popularLoading, error: popularError, data: popularMovies },
  ]);

  const data: HomeScreenData | undefined =
    status === "success"
      ? {
          trending: trendingMovies || [],
          popular: popularMovies || [],
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
