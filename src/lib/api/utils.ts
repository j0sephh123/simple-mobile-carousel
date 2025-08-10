import { API_CONFIG } from "../../config/api";

const BASE_URL = API_CONFIG?.OMDB_BASE_URL ?? "https://www.omdbapi.com/";
const API_KEY = API_CONFIG?.OMDB_API_KEY ?? process.env.EXPO_PUBLIC_OMDB_API_KEY;

export function constructOMDBUrl(endpoint: string, params: Record<string, string | number>): string {
  if (!API_KEY) {
    throw new Error("OMDB API key is required. Set EXPO_PUBLIC_OMDB_API_KEY or API_CONFIG.OMDB_API_KEY.");
  }

  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}
