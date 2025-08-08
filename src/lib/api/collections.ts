import { CollectionKey } from "./types";
export const COLLECTIONS: Record<CollectionKey, { title: string; imdbIDs: string[] }> =
  {
    popularClassics: {
      title: "Popular Classics",
      imdbIDs: [
        "tt0111161", // Shawshank
        "tt0068646", // The Godfather
        "tt0468569", // The Dark Knight
        "tt0071562", // The Godfather Part II
        "tt0050083", // 12 Angry Men
        "tt0108052", // Schindler's List
        "tt0167260", // LOTR: ROTK
        "tt0110912", // Pulp Fiction
        "tt0060196", // The Good, the Bad and the Ugly
        "tt0133093", // The Matrix
      ],
    },
    sciFi: {
      title: "Sci-Fi Essentials",
      imdbIDs: [
        "tt1375666", // Inception
        "tt0083658", // Blade Runner
        "tt0062622", // 2001: A Space Odyssey
        "tt0816692", // Interstellar
        "tt0082971", // Raiders of the Lost Ark (adventure, still plays great)
        "tt0103064", // Terminator 2
        "tt0120737", // LOTR: Fellowship
        "tt0080684", // The Empire Strikes Back
      ],
    },
    nolan: {
      title: "Christopher Nolan",
      imdbIDs: [
        "tt1375666", // Inception
        "tt0816692", // Interstellar
        "tt0468569", // The Dark Knight
        "tt0482571", // The Prestige
        "tt5013056", // Dunkirk
        "tt1345836", // The Dark Knight Rises
        "tt0209144", // Memento
        "tt15398776", // Oppenheimer
      ],
    },
    crime: {
      title: "Crime & Grit",
      imdbIDs: [
        "tt0110912", // Pulp Fiction
        "tt0075314", // Taxi Driver
        "tt0993846", // The Wolf of Wall Street
        "tt7286456", // Joker
        "tt0112641", // Casino
        "tt0102926", // The Silence of the Lambs
        "tt0110413", // Léon: The Professional
        "tt0114814", // The Usual Suspects
      ],
    },
  };
export const TRENDING_POOL_IDS = Array.from(
  new Set([
    ...COLLECTIONS.popularClassics.imdbIDs,
    ...COLLECTIONS.sciFi.imdbIDs,
    ...COLLECTIONS.nolan.imdbIDs,
    ...COLLECTIONS.crime.imdbIDs,
    "tt4154796",
    "tt4154756",
  ])
);
