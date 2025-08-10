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

  const data: HomeScreenData | undefined =
    status === "success"
      ? {
          featured: (featuredMovies as MovieSummary[]) || [],
          trending: (trendingMovies as MovieSummary[]) || [],
          popular: (popularMovies as MovieSummary[]) || [],
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
