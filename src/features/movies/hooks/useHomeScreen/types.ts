import { type MovieSummary } from "@/src/lib/api/types";

export type HomeScreenData = {
  featured: MovieSummary[];
  trending: MovieSummary[];
  popular: MovieSummary[];
};
