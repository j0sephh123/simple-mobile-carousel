import { type MovieDetail, type MovieSummary } from "@/src/lib/api/types";
import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedMovies,
  getMovieDetails,
  getPopularMovies,
  getTrendingMovies,
} from "../../shared-data/omdbRepository";

const queryKeys = {
  featured: ["movies", "featured"] as const,
  trending: ["movies", "trending"] as const,
  popular: ["movies", "popular"] as const,
  details: (imdbId?: string) =>
    imdbId
      ? (["movies", "details", imdbId] as const)
      : (["movies", "details", "none"] as const),
};

export function useFeaturedMoviesQuery() {
  return useQuery<MovieSummary[]>({
    queryKey: queryKeys.featured,
    queryFn: () => getFeaturedMovies(),
  });
}

export function useTrendingMoviesQuery() {
  return useQuery<MovieSummary[]>({
    queryKey: queryKeys.trending,
    queryFn: () => getTrendingMovies(),
  });
}

export function usePopularMoviesQuery() {
  return useQuery<MovieSummary[]>({
    queryKey: queryKeys.popular,
    queryFn: () => getPopularMovies(),
  });
}

export function useMovieDetailsQuery(imdbId?: string) {
  return useQuery<MovieDetail>({
    queryKey: queryKeys.details(imdbId),
    queryFn: () => getMovieDetails(imdbId as string),
    enabled: Boolean(imdbId),
  });
}
