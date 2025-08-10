export type CollectionKey = "featured" | "popular" | "trending";

type SearchCollection = {
  label: string;
  queries: string[];
};

export const COLLECTIONS = {
  featured: {
    label: "Featured Movies",
    queries: ["star wars", "empire", "jedi", "skywalker", "rogue one", "solo"],
  },
  popular: {
    label: "Popular Movies",
    queries: ["lord of the rings", "the hobbit", "middle earth", "tolkien"],
  },
  trending: {
    label: "Trending Now",
    queries: [
      "marvel",
      "avengers",
      "iron man",
      "thor",
      "captain america",
      "spider-man",
      "x-men",
      "guardians",
    ],
  },
} satisfies Record<CollectionKey, SearchCollection>;
