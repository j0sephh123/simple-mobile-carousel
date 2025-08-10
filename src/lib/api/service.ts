import { API_CONFIG } from "../../config/api";
import { fetchJSON } from "./client";
import { COLLECTIONS } from "./collections";
import { CollectionKey, Movie, MovieDetail, SearchResponse } from "./types";

const BASE = API_CONFIG.OMDB_BASE_URL ?? "https://www.omdbapi.com/";
const CONCURRENCY = 5;

export class OMDBService {
  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error(
        "OMDB API key is required. Please set EXPO_PUBLIC_OMDB_API_KEY in your environment."
      );
    }
  }
  async getMovieDetails(imdbId?: string) {
    if (!imdbId) throw new Error("IMDB ID is required");
    const url = `${BASE}?apikey=${this.apiKey}&i=${imdbId}`;
    const data = await fetchJSON<MovieDetail>(url);
    if (data.Response === "False") {
      throw new Error("Failed to fetch movie details");
    }
    return data;
  }
  private async processBatch(ids: string[]) {
    return Promise.all(ids.map((id) => this.getMovieDetails(id)));
  }

  async getMoviesByIds(ids: string[]) {
    const results: (MovieDetail | null)[] = [];
    for (let i = 0; i < ids.length; i += CONCURRENCY) {
      const batch = ids.slice(i, i + CONCURRENCY);
      const batchResults = await this.processBatch(batch);
      results.push(...batchResults);
    }
    return results;
  }
  async getCollection(key: CollectionKey) {
    const { imdbIDs } = COLLECTIONS[key];
    const movies = await this.getMoviesByIds(imdbIDs);
    return movies.filter(Boolean);
  }
  async getTrendingMovies() {
    const movies = await this.getCollection("popularClassics");
    return movies.filter((movie): movie is MovieDetail => movie !== null);
  }
  async getPopularMovies() {
    const movies = await this.getCollection("popularClassics");
    return movies.filter((movie): movie is MovieDetail => movie !== null);
  }

  async searchMovies(query: string, page = 1): Promise<Movie[]> {
    if (!query) throw new Error("Search query is required");
    const url = `${BASE}?apikey=${this.apiKey}&s=${encodeURIComponent(
      query
    )}&page=${page}`;
    const data = await fetchJSON<SearchResponse>(url);
    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }
    return data.Search || [];
  }
}
