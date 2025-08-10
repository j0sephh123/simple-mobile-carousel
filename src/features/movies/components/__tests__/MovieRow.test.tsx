import { MovieSummary } from "@/src/lib/api/types";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { MovieRow } from "../MovieRow";

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

const mockOnPress = jest.fn();

describe("MovieRow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with title and movies", () => {
    render(
      <MovieRow
        title="Popular Movies"
        movies={mockMovies}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByText("Popular Movies")).toBeTruthy();
    expect(screen.getByText("Test Movie 1")).toBeTruthy();
    expect(screen.getByText("Test Movie 2")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(
      <MovieRow
        title="Small Movies"
        movies={mockMovies}
        onPress={mockOnPress}
        size="medium"
      />
    );

    expect(screen.getByText("Small Movies")).toBeTruthy();

    rerender(
      <MovieRow
        title="Large Movies"
        movies={mockMovies}
        onPress={mockOnPress}
        size="large"
      />
    );

    expect(screen.getByText("Large Movies")).toBeTruthy();
  });

  it("returns null when movies array is empty", () => {
    const { UNSAFE_root } = render(
      <MovieRow title="Popular Movies" movies={[]} onPress={mockOnPress} />
    );

    expect(UNSAFE_root.children).toHaveLength(0);
  });

  it("handles title with special characters", () => {
    render(
      <MovieRow
        title="Popular Movies! @#$%^&*()"
        movies={mockMovies}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByText("Popular Movies! @#$%^&*()")).toBeTruthy();
  });
});
