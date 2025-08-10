import { API_CONFIG } from "@/src/config/api";
import type { MovieDetail, MovieSummary, SearchResponse } from "./types";

function buildUrl(params: Record<string, string | number>) {
  const base = API_CONFIG?.OMDB_BASE_URL ?? "https://www.omdbapi.com/";
  const key =
    API_CONFIG?.OMDB_API_KEY ?? process.env.EXPO_PUBLIC_OMDB_API_KEY;
  if (!key) throw new Error("Missing OMDB API key");

  const url = new URL(base);
  url.searchParams.set("apikey", key);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as T;
}

export const omdbClient = {
  async byId(imdbId: string): Promise<MovieDetail> {
    const data = await getJSON<MovieDetail>(buildUrl({ i: imdbId }));
    if (data.Response === "False") throw new Error("Movie not found");
    return data;
  },
  async search(query: string, page = 1): Promise<MovieSummary[]> {
    const data = await getJSON<SearchResponse>(buildUrl({ s: query, page }));
    if (data.Response === "False") return [];
    return data.Search ?? [];
  },
} as const;
