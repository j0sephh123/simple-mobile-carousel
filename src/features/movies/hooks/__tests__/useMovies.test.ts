import { type MovieDetail, type MovieSummary } from "@/src/lib/api/types";
import { createQueryWrapper } from "@/src/test/utils/queryWrapper";
import { renderHook, waitFor } from "@testing-library/react-native";
import {
  useFeaturedMoviesQuery,
  useMovieDetailsQuery,
  usePopularMoviesQuery,
  useTrendingMoviesQuery,
} from "../useMovies";

import {
  getFeaturedMovies,
  getMovieDetails,
  getPopularMovies,
  getTrendingMovies,
} from "../../../shared-data/omdbRepository";

jest.mock("../../../shared-data/omdbRepository", () => ({
  getFeaturedMovies: jest.fn(),
  getTrendingMovies: jest.fn(),
  getPopularMovies: jest.fn(),
  getMovieDetails: jest.fn(),
}));

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
];

const mockDetail: MovieDetail = {
  Title: "Test Movie 1",
  Year: "2023",
  imdbID: "tt1234567",
  Type: "movie",
  Poster: "https://example.com/poster1.jpg",
  imdbRating: "7.5",
  Response: "True",
} as unknown as MovieDetail;

describe("useMovies hooks", () => {
  const wrapper = createQueryWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads featured movies", async () => {
    (getFeaturedMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    const { result, unmount } = renderHook(() => useFeaturedMoviesQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovies);

    unmount();
  });

  it("loads trending movies", async () => {
    (getTrendingMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    const { result, unmount } = renderHook(() => useTrendingMoviesQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovies);

    unmount();
  });

  it("loads popular movies", async () => {
    (getPopularMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    const { result, unmount } = renderHook(() => usePopularMoviesQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovies);

    unmount();
  });

  it("does not run details query when imdbId is undefined, then runs after enabling", async () => {
    const imdbId = "tt1234567";
    (getMovieDetails as jest.Mock).mockResolvedValueOnce(mockDetail);

    const { result, rerender, unmount } = renderHook(
      ({ id }) => useMovieDetailsQuery(id),
      { initialProps: { id: undefined as string | undefined }, wrapper }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isSuccess).toBe(false);

    rerender({ id: imdbId });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getMovieDetails).toHaveBeenCalledWith(imdbId);
    expect(result.current.data).toEqual(mockDetail);

    unmount();
  });

  it("propagates repository errors", async () => {
    const err = new Error("Network down");
    (getTrendingMovies as jest.Mock).mockRejectedValueOnce(err);

    const { result, unmount } = renderHook(() => useTrendingMoviesQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBe(err);

    unmount();
  });
});
