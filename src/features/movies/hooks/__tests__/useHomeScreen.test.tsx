/* eslint-disable react/display-name */
import { MovieSummary } from "@/src/lib/api/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import React from "react";
import { useHomeScreen } from "../useHomeScreen";

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

const mockRouter = {
  push: jest.fn(),
};

jest.mock("expo-router", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("../useMovies", () => ({
  useFeaturedMoviesQuery: () => ({
    data: mockMovies,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
  usePopularMoviesQuery: () => ({
    data: mockMovies,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
  useTrendingMoviesQuery: () => ({
    data: mockMovies,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns success status when queries succeed", async () => {
    const { result } = renderHook(() => useHomeScreen(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
  });

  it("calls router.push when handleMoviePress is called", () => {
    const { result } = renderHook(() => useHomeScreen(), {
      wrapper: createWrapper(),
    });

    result.current.handleMoviePress(mockMovies[0]);

    expect(mockRouter.push).toHaveBeenCalledWith("/(stack)/movie/tt1234567");
  });
});
