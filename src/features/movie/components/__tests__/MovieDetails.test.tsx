import { type MovieDetail } from "@/src/lib/api/types";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { MovieDetails } from "../MovieDetails";

const mockMovieDetail: Pick<MovieDetail, "Plot" | "Genre"> = {
  Plot: "A test movie plot that describes the story.",
  Genre: "Action, Adventure, Sci-Fi",
};

describe("MovieDetails", () => {
  it("renders plot section correctly", () => {
    render(<MovieDetails {...mockMovieDetail} />);

    expect(screen.getByText("Plot")).toBeTruthy();
    expect(
      screen.getByText("A test movie plot that describes the story.")
    ).toBeTruthy();
  });

  it("renders genre section correctly", () => {
    render(<MovieDetails {...mockMovieDetail} />);

    expect(screen.getByText("Genre")).toBeTruthy();
    expect(screen.getByText("Action, Adventure, Sci-Fi")).toBeTruthy();
  });

  it("renders both sections", () => {
    render(<MovieDetails {...mockMovieDetail} />);

    expect(screen.getByText("Plot")).toBeTruthy();
    expect(screen.getByText("Genre")).toBeTruthy();
  });

  it("handles empty plot and genre", () => {
    const emptyMovieDetail = {
      Plot: "",
      Genre: "",
    };

    render(<MovieDetails {...emptyMovieDetail} />);

    expect(screen.getByText("Plot")).toBeTruthy();
    expect(screen.getByText("Genre")).toBeTruthy();
  });
});
