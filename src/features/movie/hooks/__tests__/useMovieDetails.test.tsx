import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";
import React from "react";
import { determineQueryStatus } from "../../../../hooks/api/useQueryStatus";
import { useRefresh } from "../../../../hooks/api/useRefresh";
import { useMovieDetailsQuery } from "../../../movies/hooks/useMovies";
import { useMovieDetails } from "../useMovieDetails";

jest.mock("../../../movies/hooks/useMovies", () => ({
  useMovieDetailsQuery: jest.fn(),
}));

jest.mock("../../../../hooks/api/useRefresh", () => ({
  useRefresh: jest.fn(),
}));

jest.mock("../../../../hooks/api/useQueryStatus", () => ({
  determineQueryStatus: jest.fn(),
}));

const mockUseMovieDetailsQuery = useMovieDetailsQuery as jest.MockedFunction<
  typeof useMovieDetailsQuery
>;
const mockUseRefresh = useRefresh as jest.MockedFunction<typeof useRefresh>;
const mockDetermineQueryStatus = determineQueryStatus as jest.MockedFunction<
  typeof determineQueryStatus
>;

const mockMovie = {
  Title: "Test Movie",
  Year: "2023",
  Rated: "PG-13",
  Released: "2023-01-01",
  Runtime: "120 min",
  Genre: "Action, Adventure",
  Director: "Test Director",
  Writer: "Test Writer",
  Actors: "Actor 1, Actor 2",
  Plot: "A test movie plot",
  Poster: "https://example.com/poster.jpg",
  Ratings: [],
  Metascore: "75",
  imdbRating: "8.0",
  imdbVotes: "1000",
  imdbID: "tt1234567",
  Type: "movie",
  DVD: "2023-01-01",
  BoxOffice: "$100M",
  Production: "Test Production",
  Website: "https://example.com",
  Response: "True",
};

const mockRefetch = jest.fn();
const mockHandleRefresh = jest.fn();

function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
}

describe("useMovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMovieDetailsQuery.mockReturnValue({
      data: mockMovie,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    mockUseRefresh.mockReturnValue({
      refreshing: false,
      handleRefresh: mockHandleRefresh,
    });

    mockDetermineQueryStatus.mockReturnValue("success");
  });

  it("returns movie data and status", () => {
    const { result } = renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(result.current.movie).toEqual(mockMovie);
    expect(result.current.status).toBe("success");
    expect(result.current.isFetching).toBe(false);
    expect(result.current.refreshing).toBe(false);
  });

  it("calls useMovieDetailsQuery with correct id", () => {
    renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(mockUseMovieDetailsQuery).toHaveBeenCalledWith("tt1234567");
  });

  it("calls useRefresh with refetch function", () => {
    renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(mockUseRefresh).toHaveBeenCalledWith(mockRefetch);
  });

  it("calls determineQueryStatus with correct parameters", () => {
    renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(mockDetermineQueryStatus).toHaveBeenCalledWith({
      isLoading: false,
      error: null,
      data: mockMovie,
    });
  });

  it("handles loading state", () => {
    mockUseMovieDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    mockDetermineQueryStatus.mockReturnValue("loading");

    const { result } = renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(result.current.status).toBe("loading");
    expect(result.current.movie).toBeUndefined();
  });

  it("handles error state", () => {
    const mockError = new Error("Failed to fetch");
    mockUseMovieDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: mockError,
      refetch: mockRefetch,
    } as any);

    mockDetermineQueryStatus.mockReturnValue("error");

    const { result } = renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(result.current.status).toBe("error");
    expect(result.current.movie).toBeUndefined();
  });

  it("handles refreshing state", () => {
    mockUseRefresh.mockReturnValue({
      refreshing: true,
      handleRefresh: mockHandleRefresh,
    });

    const { result } = renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(result.current.refreshing).toBe(true);
  });

  it("provides handleRefresh function", () => {
    const { result } = renderHook(() => useMovieDetails("tt1234567"), {
      wrapper: TestWrapper,
    });

    expect(result.current.handleRefresh).toBe(mockHandleRefresh);
  });
});
