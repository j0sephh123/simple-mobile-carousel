import { type MovieSummary } from "@/src/lib/api/types";

export function dedupeMoviesById(movies: MovieSummary[]): MovieSummary[] {
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

export function computeHomeLists(
  featured: MovieSummary[] | undefined,
  trending: MovieSummary[] | undefined,
  popular: MovieSummary[] | undefined
) {
  const featuredUnique = dedupeMoviesById(featured ?? []);
  const trendingUnique = dedupeMoviesById(trending ?? []);
  const popularUnique = dedupeMoviesById(popular ?? []);

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

  return {
    featuredUnique,
    trendingFiltered,
    popularFiltered,
  } as const;
}
