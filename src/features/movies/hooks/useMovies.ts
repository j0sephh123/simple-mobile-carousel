import { Movie, MovieDetail, omdbService } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const queryKeys = {
  trending: ["movies", "trending"] as const,
  popular: ["movies", "popular"] as const,
  details: (imdbId: string) => ["movies", "details", imdbId] as const,
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
    queryKey: imdbId
      ? queryKeys.details(imdbId)
      : ["movies", "details", "none"],
    queryFn: () => omdbService.getMovieDetails(imdbId as string),
    enabled: Boolean(imdbId),
  });
}
