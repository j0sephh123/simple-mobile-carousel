import { MovieSummary } from "@/src/lib/api/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { MovieList } from "../MovieList";

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

const mockOnMoviePress = jest.fn();

describe("MovieList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders list with movies", () => {
    render(<MovieList movies={mockMovies} onMoviePress={mockOnMoviePress} />);

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
    expect(screen.getByText("Test Movie 2")).toBeTruthy();
  });

  it("renders with title", () => {
    render(
      <MovieList
        title="Popular Movies"
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
      />
    );

    expect(screen.getByText("Popular Movies")).toBeTruthy();
  });

  it("does not render when movies array is empty", () => {
    const { UNSAFE_root } = render(
      <MovieList movies={[]} onMoviePress={mockOnMoviePress} />
    );

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it("does not render when movies is null", () => {
    const { UNSAFE_root } = render(
      <MovieList movies={null as any} onMoviePress={mockOnMoviePress} />
    );

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it("calls onMoviePress when movie is pressed", () => {
    render(<MovieList movies={mockMovies} onMoviePress={mockOnMoviePress} />);

    const firstMovie = screen.getByText("Test Movie 1");
    fireEvent.press(firstMovie);

    expect(mockOnMoviePress).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("renders with different sizes", () => {
    render(
      <MovieList
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
        size="large"
      />
    );

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
  });

  it("handles empty title string", () => {
    render(
      <MovieList
        title="   "
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
      />
    );

    expect(screen.queryByText("   ")).toBeFalsy();
  });
});
