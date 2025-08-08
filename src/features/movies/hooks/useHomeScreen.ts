import { Movie } from "@/src/lib/api";
import { useRouter } from "expo-router";
import React from "react";
import { isNetworkError } from "../../../lib/utils";
import { usePopularMoviesQuery, useTrendingMoviesQuery } from "./useMovies";

export type Status = "loading" | "offline" | "error" | "empty" | "success";

export type HomeScreenData = {
  trending: Movie[];
  popular: Movie[];
};

export function useHomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

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

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([refetchTrending(), refetchPopular()]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/(stack)/movie/${movie.imdbID}`);
  };

  let status: Status;
  if (trendingLoading || popularLoading) status = "loading";
  else if (
    (trendingError && isNetworkError(trendingError)) ||
    (popularError && isNetworkError(popularError))
  )
    status = "offline";
  else if (trendingError || popularError) status = "error";
  else if (!trendingMovies?.length && !popularMovies?.length) status = "empty";
  else status = "success";

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
