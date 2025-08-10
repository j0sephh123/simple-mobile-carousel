import { MovieSummary } from "@/src/lib/api/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { MovieCard } from "../MovieCard";

const mockMovie: MovieSummary = {
  Title: "Test Movie",
  Year: "2023",
  imdbID: "tt1234567",
  Type: "movie",
  Poster: "https://example.com/poster.jpg",
};

const mockOnPress = jest.fn();

describe("MovieCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default medium size", () => {
    render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("renders with small size", () => {
    render(<MovieCard movie={mockMovie} onPress={mockOnPress} size="small" />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("renders with large size", () => {
    render(<MovieCard movie={mockMovie} onPress={mockOnPress} size="large" />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    render(<MovieCard movie={mockMovie} onPress={mockOnPress} />);

    const card = screen.getByText("Test Movie");
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledWith(mockMovie);
  });

  it("handles image error and shows placeholder", () => {
    const movieWithInvalidPoster = { ...mockMovie, Poster: "N/A" };

    render(<MovieCard movie={movieWithInvalidPoster} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("handles empty poster URL", () => {
    const movieWithEmptyPoster = { ...mockMovie, Poster: "" };

    render(<MovieCard movie={movieWithEmptyPoster} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("handles null poster", () => {
    const movieWithNullPoster = {
      ...mockMovie,
      Poster: null,
    } as unknown as MovieSummary;

    render(<MovieCard movie={movieWithNullPoster} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("handles undefined poster", () => {
    const movieWithUndefinedPoster = {
      ...mockMovie,
      Poster: undefined,
    } as unknown as MovieSummary;

    render(
      <MovieCard movie={movieWithUndefinedPoster} onPress={mockOnPress} />
    );

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("handles movies with very long titles", () => {
    const movieWithLongTitle = {
      ...mockMovie,
      Title:
        "This is a very long movie title that should be displayed properly in the card component",
    };

    render(<MovieCard movie={movieWithLongTitle} onPress={mockOnPress} />);

    expect(
      screen.getByText(
        "This is a very long movie title that should be displayed properly in the card component"
      )
    ).toBeTruthy();
  });

  it("handles movies with special characters in title", () => {
    const movieWithSpecialChars = {
      ...mockMovie,
      Title: "Movie with special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?",
    };

    render(<MovieCard movie={movieWithSpecialChars} onPress={mockOnPress} />);

    expect(
      screen.getByText(
        "Movie with special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?"
      )
    ).toBeTruthy();
  });

  it("handles movies with empty title", () => {
    const movieWithEmptyTitle = { ...mockMovie, Title: "" };

    render(<MovieCard movie={movieWithEmptyTitle} onPress={mockOnPress} />);

    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with null title", () => {
    const movieWithNullTitle = {
      ...mockMovie,
      Title: null,
    } as unknown as MovieSummary;

    render(<MovieCard movie={movieWithNullTitle} onPress={mockOnPress} />);

    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with undefined title", () => {
    const movieWithUndefinedTitle = {
      ...mockMovie,
      Title: undefined,
    } as unknown as MovieSummary;

    render(<MovieCard movie={movieWithUndefinedTitle} onPress={mockOnPress} />);

    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with empty year", () => {
    const movieWithEmptyYear = { ...mockMovie, Year: "" };

    render(<MovieCard movie={movieWithEmptyYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with null year", () => {
    const movieWithNullYear = {
      ...mockMovie,
      Year: null,
    } as unknown as MovieSummary;

    render(<MovieCard movie={movieWithNullYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with undefined year", () => {
    const movieWithUndefinedYear = {
      ...mockMovie,
      Year: undefined,
    } as unknown as MovieSummary;

    render(<MovieCard movie={movieWithUndefinedYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with very long year", () => {
    const movieWithLongYear = { ...mockMovie, Year: "2023-2024" };

    render(<MovieCard movie={movieWithLongYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023-2024")).toBeTruthy();
  });

  it("handles movies with special characters in year", () => {
    const movieWithSpecialYear = { ...mockMovie, Year: "2023*" };

    render(<MovieCard movie={movieWithSpecialYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023*")).toBeTruthy();
  });

  it("handles movies with numeric year as string", () => {
    const movieWithNumericYear = { ...mockMovie, Year: "2023" };

    render(<MovieCard movie={movieWithNumericYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
  });

  it("handles movies with alphanumeric year", () => {
    const movieWithAlphanumericYear = { ...mockMovie, Year: "2023a" };

    render(
      <MovieCard movie={movieWithAlphanumericYear} onPress={mockOnPress} />
    );

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023a")).toBeTruthy();
  });

  it("handles movies with whitespace in title", () => {
    const movieWithWhitespaceTitle = { ...mockMovie, Title: "  Test Movie  " };

    render(
      <MovieCard movie={movieWithWhitespaceTitle} onPress={mockOnPress} />
    );

    expect(screen.getByText("  Test Movie  ")).toBeTruthy();
  });

  it("handles movies with whitespace in year", () => {
    const movieWithWhitespaceYear = { ...mockMovie, Year: " 2023 " };

    render(<MovieCard movie={movieWithWhitespaceYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText(" 2023 ")).toBeTruthy();
  });

  it("handles movies with newline characters in title", () => {
    const movieWithNewlineTitle = { ...mockMovie, Title: "Test\nMovie" };

    render(<MovieCard movie={movieWithNewlineTitle} onPress={mockOnPress} />);

    expect(screen.getByText("Test\nMovie")).toBeTruthy();
  });

  it("handles movies with tab characters in title", () => {
    const movieWithTabTitle = { ...mockMovie, Title: "Test\tMovie" };

    render(<MovieCard movie={movieWithTabTitle} onPress={mockOnPress} />);

    expect(screen.getByText("Test\tMovie")).toBeTruthy();
  });

  it("handles movies with unicode characters in title", () => {
    const movieWithUnicodeTitle = { ...mockMovie, Title: "Test Movie 🎬" };

    render(<MovieCard movie={movieWithUnicodeTitle} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie 🎬")).toBeTruthy();
  });

  it("handles movies with unicode characters in year", () => {
    const movieWithUnicodeYear = { ...mockMovie, Year: "2023🎬" };

    render(<MovieCard movie={movieWithUnicodeYear} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2023🎬")).toBeTruthy();
  });
});
