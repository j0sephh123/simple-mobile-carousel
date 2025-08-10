import { MovieSummary } from "@/src/lib/api/types";
import { computeHomeLists, dedupeMoviesById } from "../useHomeScreen/selectors";

const mockMovies: MovieSummary[] = [
  {
    Title: "Test Movie 1",
    Year: "2023",
    imdbID: "tt1234567",
    Type: "movie",
    Poster: "https://example.com/poster1.jpg",
  },
  {
    Title: "Test Movie 2",
    Year: "2022",
    imdbID: "tt7654321",
    Type: "movie",
    Poster: "https://example.com/poster2.jpg",
  },
  {
    Title: "Test Movie 3",
    Year: "2021",
    imdbID: "tt1111111",
    Type: "movie",
    Poster: "https://example.com/poster3.jpg",
  },
  {
    Title: "Test Movie 4",
    Year: "2020",
    imdbID: "tt9999999",
    Type: "movie",
    Poster: "https://example.com/poster4.jpg",
  },
];

describe("dedupeMoviesById", () => {
  it("returns empty array for empty input", () => {
    const result = dedupeMoviesById([]);
    expect(result).toEqual([]);
  });

  it("removes duplicates based on imdbID", () => {
    const duplicateMovies = [
      ...mockMovies,
      { ...mockMovies[0], Title: "Duplicate Title" },
    ];
    const result = dedupeMoviesById(duplicateMovies);
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockMovies);
  });

  it("preserves order of first occurrence", () => {
    const duplicateMovies = [
      mockMovies[0],
      { ...mockMovies[0], Title: "Duplicate Title" },
      mockMovies[1],
    ];
    const result = dedupeMoviesById(duplicateMovies);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockMovies[0]);
    expect(result[1]).toEqual(mockMovies[1]);
  });

  it("handles single movie array", () => {
    const result = dedupeMoviesById([mockMovies[0]]);
    expect(result).toEqual([mockMovies[0]]);
  });

  it("handles multiple duplicates of same movie", () => {
    const multipleDuplicates = [
      mockMovies[0],
      { ...mockMovies[0], Title: "Duplicate 1" },
      { ...mockMovies[0], Title: "Duplicate 2" },
      mockMovies[1],
    ];
    const result = dedupeMoviesById(multipleDuplicates);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockMovies[0]);
    expect(result[1]).toEqual(mockMovies[1]);
  });
});

describe("computeHomeLists", () => {
  it("returns empty arrays when all inputs are undefined", () => {
    const result = computeHomeLists(undefined, undefined, undefined);
    expect(result.featuredUnique).toEqual([]);
    expect(result.trendingFiltered).toEqual([]);
    expect(result.popularFiltered).toEqual([]);
  });

  it("returns empty arrays when all inputs are empty arrays", () => {
    const result = computeHomeLists([], [], []);
    expect(result.featuredUnique).toEqual([]);
    expect(result.trendingFiltered).toEqual([]);
    expect(result.popularFiltered).toEqual([]);
  });

  it("handles mixed inputs correctly", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[1]];
    const popular = [mockMovies[2]];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual(popular);
  });

  it("filters trending movies that exist in featured", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[0], mockMovies[1]];
    const popular = [mockMovies[2]];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual([mockMovies[1]]);
    expect(result.popularFiltered).toEqual([mockMovies[2]]);
  });

  it("filters popular movies that exist in featured or trending", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[1]];
    const popular = [mockMovies[0], mockMovies[1], mockMovies[2]];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual([mockMovies[2]]);
  });

  it("handles movies appearing in multiple lists", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[0], mockMovies[1]];
    const popular = [mockMovies[0], mockMovies[1], mockMovies[2]];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual([mockMovies[1]]);
    expect(result.popularFiltered).toEqual([mockMovies[2]]);
  });

  it("handles undefined featured list", () => {
    const trending = [mockMovies[0], mockMovies[1]];
    const popular = [mockMovies[2]];

    const result = computeHomeLists(undefined, trending, popular);

    expect(result.featuredUnique).toEqual([]);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual(popular);
  });

  it("handles undefined trending list", () => {
    const featured = [mockMovies[0]];
    const popular = [mockMovies[1], mockMovies[2]];

    const result = computeHomeLists(featured, undefined, popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual([]);
    expect(result.popularFiltered).toEqual(popular);
  });

  it("handles undefined popular list", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[1]];

    const result = computeHomeLists(featured, trending, undefined);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual([]);
  });

  it("handles complex deduplication across all lists", () => {
    const featured = [mockMovies[0], mockMovies[1]];
    const trending = [mockMovies[0], mockMovies[2], mockMovies[3]];
    const popular = [mockMovies[1], mockMovies[2], mockMovies[4] || { ...mockMovies[0], imdbID: "tt8888888" }];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique).toEqual([mockMovies[0], mockMovies[1]]);
    expect(result.trendingFiltered).toEqual([mockMovies[2], mockMovies[3]]);
    expect(result.popularFiltered).toEqual([mockMovies[4] || { ...mockMovies[0], imdbID: "tt8888888" }]);
  });

  it("maintains original movie objects without mutation", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[1]];
    const popular = [mockMovies[2]];

    const result = computeHomeLists(featured, trending, popular);

    expect(result.featuredUnique[0]).toBe(featured[0]);
    expect(result.trendingFiltered[0]).toBe(trending[0]);
    expect(result.popularFiltered[0]).toBe(popular[0]);
  });

  it("handles empty featured list with other populated lists", () => {
    const trending = [mockMovies[0], mockMovies[1]];
    const popular = [mockMovies[2]];

    const result = computeHomeLists([], trending, popular);

    expect(result.featuredUnique).toEqual([]);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual(popular);
  });

  it("handles empty trending list with other populated lists", () => {
    const featured = [mockMovies[0]];
    const popular = [mockMovies[1]];

    const result = computeHomeLists(featured, [], popular);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual([]);
    expect(result.popularFiltered).toEqual(popular);
  });

  it("handles empty popular list with other populated lists", () => {
    const featured = [mockMovies[0]];
    const trending = [mockMovies[1]];

    const result = computeHomeLists(featured, trending, []);

    expect(result.featuredUnique).toEqual(featured);
    expect(result.trendingFiltered).toEqual(trending);
    expect(result.popularFiltered).toEqual([]);
  });
});
