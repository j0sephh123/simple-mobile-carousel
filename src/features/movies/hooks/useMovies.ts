import { Movie, MovieDetail, omdbService } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const queryKeys = {
  trending: ["movies", "trending"] as const,
  popular: ["movies", "popular"] as const,
  details: (imdbId?: string) =>
    imdbId
      ? (["movies", "details", imdbId] as const)
      : (["movies", "details", "none"] as const),
};

export function useTrendingMoviesQuery() {
  return useQuery<Movie[]>({
    queryKey: queryKeys.trending,
    queryFn: () => omdbService.getTrendingMovies(),
  });
}

export function usePopularMoviesQuery() {
  return useQuery<Movie[]>({
    queryKey: queryKeys.popular,
    queryFn: () => omdbService.getPopularMovies(),
  });
}

export function useMovieDetailsQuery(imdbId?: string) {
  return useQuery<MovieDetail>({
    queryKey: queryKeys.details(imdbId),
    queryFn: () => omdbService.getMovieDetails(imdbId as string),
    enabled: Boolean(imdbId),
  });
}
