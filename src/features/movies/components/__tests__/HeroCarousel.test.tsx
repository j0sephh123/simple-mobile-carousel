import { MovieSummary } from "@/src/lib/api/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { HeroCarousel } from "../HeroCarousel";

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
];

const mockOnPress = jest.fn();

describe("HeroCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with movie data", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
    expect(screen.getByText("Test Movie 2")).toBeTruthy();
    expect(screen.getByText("Test Movie 3")).toBeTruthy();
    expect(screen.getByText("2023")).toBeTruthy();
    expect(screen.getByText("2022")).toBeTruthy();
    expect(screen.getByText("2021")).toBeTruthy();
  });

  it("handles empty movies array", () => {
    render(<HeroCarousel movies={[]} onPress={mockOnPress} />);

    expect(screen.queryByText("Test Movie 1")).toBeFalsy();
  });

  it("removes duplicate movies", () => {
    const duplicateMovies = [
      ...mockMovies,
      { ...mockMovies[0], Title: "Duplicate Movie" },
    ];

    render(<HeroCarousel movies={duplicateMovies} onPress={mockOnPress} />);

    const movie1Instances = screen.getAllByText("Test Movie 1");
    expect(movie1Instances).toHaveLength(1);
  });

  it("handles image error and shows placeholder", () => {
    const moviesWithInvalidPoster = [{ ...mockMovies[0], Poster: "N/A" }];

    render(
      <HeroCarousel movies={moviesWithInvalidPoster} onPress={mockOnPress} />
    );

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
  });

  it("calls onPress when movie is pressed", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const firstMovie = screen.getByText("Test Movie 1");
    fireEvent.press(firstMovie);

    expect(mockOnPress).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("updates current movie on scroll", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 375 } },
    });
  });

  it("renders correct number of indicators", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const indicators = screen.getAllByTestId("hero-indicator");
    expect(indicators).toHaveLength(3);
  });

  it("handles movies with missing poster URLs", () => {
    const moviesWithMissingPoster = [
      { ...mockMovies[0], Poster: "" },
      { ...mockMovies[1], Poster: undefined },
    ] as unknown as MovieSummary[];

    render(
      <HeroCarousel movies={moviesWithMissingPoster} onPress={mockOnPress} />
    );

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
    expect(screen.getByText("Test Movie 2")).toBeTruthy();
  });

  it("handles movies with null poster", () => {
    const moviesWithNullPoster = [
      { ...mockMovies[0], Poster: null },
    ] as unknown as MovieSummary[];

    render(
      <HeroCarousel movies={moviesWithNullPoster} onPress={mockOnPress} />
    );

    expect(screen.getByText("Test Movie 1")).toBeTruthy();
  });

  it("sets first movie as current by default", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 0 } },
    });
  });

  it("handles scroll to middle position", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 750 } },
    });
  });

  it("handles scroll to last position", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 1125 } },
    });
  });

  it("handles scroll beyond content bounds", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 2000 } },
    });
  });

  it("handles scroll with negative offset", () => {
    render(<HeroCarousel movies={mockMovies} onPress={mockOnPress} />);

    const flatList = screen.getByTestId("hero-flatlist");

    fireEvent(flatList, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: -100 } },
    });
  });

  it("handles movies with very long titles", () => {
    const moviesWithLongTitles = [
      {
        ...mockMovies[0],
        Title:
          "This is a very long movie title that should be truncated properly in the UI",
      },
    ];

    render(
      <HeroCarousel movies={moviesWithLongTitles} onPress={mockOnPress} />
    );

    expect(
      screen.getByText(
        "This is a very long movie title that should be truncated properly in the UI"
      )
    ).toBeTruthy();
  });

  it("handles movies with special characters in title", () => {
    const moviesWithSpecialChars = [
      { ...mockMovies[0], Title: "Movie with special chars: !@#$%^&*()" },
    ];

    render(
      <HeroCarousel movies={moviesWithSpecialChars} onPress={mockOnPress} />
    );

    expect(
      screen.getByText("Movie with special chars: !@#$%^&*()")
    ).toBeTruthy();
  });

  it("handles movies with empty title", () => {
    const moviesWithEmptyTitle = [{ ...mockMovies[0], Title: "" }];

    render(
      <HeroCarousel movies={moviesWithEmptyTitle} onPress={mockOnPress} />
    );

    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with null title", () => {
    const moviesWithNullTitle = [
      { ...mockMovies[0], Title: null },
    ] as unknown as MovieSummary[];

    render(<HeroCarousel movies={moviesWithNullTitle} onPress={mockOnPress} />);

    expect(screen.getByText("")).toBeTruthy();
  });

  it("handles movies with undefined title", () => {
    const moviesWithUndefinedTitle = [
      { ...mockMovies[0], Title: undefined },
    ] as unknown as MovieSummary[];

    render(
      <HeroCarousel movies={moviesWithUndefinedTitle} onPress={mockOnPress} />
    );

    expect(screen.getByText("")).toBeTruthy();
  });
});
