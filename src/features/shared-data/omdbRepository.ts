import {
  COLLECTIONS,
  type CollectionKey,
} from "@/src/features/movies/collections";
import { omdbClient } from "@/src/lib/api/client";
import { type MovieSummary } from "@/src/lib/api/types";

const MAX_MOVIES = 15;
const FEATURED_MOVIES = 6;

function dayOfYearSeed() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

async function getCollection(
  key: CollectionKey,
  max = MAX_MOVIES
): Promise<MovieSummary[]> {
  const { queries } = COLLECTIONS[key];
  const seed = (dayOfYearSeed() + key.length) % queries.length;
  const query = queries[seed];

  const items = await omdbClient.search(query, 1);
  return items.slice(0, max);
}

export function getFeaturedMovies() {
  return getCollection("featured", FEATURED_MOVIES);
}
export function getPopularMovies() {
  return getCollection("popular", MAX_MOVIES);
}
export function getTrendingMovies() {
  return getCollection("trending", MAX_MOVIES);
}
export function getMovieDetails(imdbId: string) {
  if (!imdbId) throw new Error("IMDB ID is required");
  return omdbClient.byId(imdbId);
}
