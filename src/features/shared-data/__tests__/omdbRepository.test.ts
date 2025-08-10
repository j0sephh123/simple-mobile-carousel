import { omdbClient } from "@/src/lib/api/client";
import {
  getFeaturedMovies,
  getMovieDetails,
  getTrendingMovies,
} from "../omdbRepository";

jest.mock("@/src/lib/api/client", () => ({
  omdbClient: {
    search: jest.fn(),
    byId: jest.fn(),
  },
}));

jest.mock("@/src/features/movies/collections", () => ({
  COLLECTIONS: {
    featured: {
      queries: ["action", "adventure", "sci-fi"],
    },
    popular: {
      queries: ["drama", "comedy", "thriller"],
    },
    trending: {
      queries: ["horror", "mystery", "romance"],
    },
  },
}));

const mockMovies = [
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
];

const mockMovieDetail = {
  Title: "Test Movie 1",
  Year: "2023",
  imdbID: "tt1234567",
  Type: "movie",
  Poster: "https://example.com/poster1.jpg",
  Plot: "A test movie plot",
  Director: "Test Director",
  Actors: "Test Actor 1, Test Actor 2",
  Rating: "8.5",
};

describe("omdbRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getFeaturedMovies", () => {
    it("returns featured movies with default limit", async () => {
      (omdbClient.search as jest.Mock).mockResolvedValue(mockMovies);

      const result = await getFeaturedMovies();

      expect(result).toHaveLength(2);
      expect(omdbClient.search).toHaveBeenCalledTimes(1);
      const callArgs = (omdbClient.search as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toBe(1);
    });
  });

  describe("getTrendingMovies", () => {
    it("returns trending movies with default limit", async () => {
      (omdbClient.search as jest.Mock).mockResolvedValue(mockMovies);

      const result = await getTrendingMovies();

      expect(result).toHaveLength(2);
      expect(omdbClient.search).toHaveBeenCalledTimes(1);
      const callArgs = (omdbClient.search as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toBe(1);
    });
  });

  describe("getMovieDetails", () => {
    it("returns movie details for valid imdbId", async () => {
      (omdbClient.byId as jest.Mock).mockResolvedValue(mockMovieDetail);

      const result = await getMovieDetails("tt1234567");

      expect(result).toEqual(mockMovieDetail);
      expect(omdbClient.byId).toHaveBeenCalledWith("tt1234567");
    });

    it("throws error when imdbId is empty", () => {
      expect(() => getMovieDetails("")).toThrow("IMDB ID is required");
      expect(omdbClient.byId).not.toHaveBeenCalled();
    });
  });
});
