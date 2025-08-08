import { API_CONFIG } from "../../config/api";
import { OMDBService } from "./service";

console.log("Creating OMDBService with key:", API_CONFIG.OMDB_API_KEY);

if (!API_CONFIG.OMDB_API_KEY) {
  throw new Error(
    "OMDB API key is required. Please set EXPO_PUBLIC_OMDB_API_KEY in your environment."
  );
}

export const omdbService = new OMDBService(API_CONFIG.OMDB_API_KEY);
console.log("OMDBService created successfully");

export { COLLECTIONS } from "./collections";
export * from "./types";
