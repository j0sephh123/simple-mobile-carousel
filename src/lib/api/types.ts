export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: "True" | "False";
}

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export type MovieSummary = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
