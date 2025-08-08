import { isNetworkError } from "../../../lib/utils";
import { useMovieDetailsQuery } from "../../movies/hooks/useMovies";

export type Status = "loading" | "offline" | "error" | "empty" | "success";

export function useMovieDetails(id?: string) {
  const enabled = !!id;
  const { data, isLoading, isFetching, error, refetch } =
    useMovieDetailsQuery(id);

  let status: Status;
  if (!enabled) status = "error";
  else if (isLoading) status = "loading";
  else if (error && isNetworkError(error)) status = "offline";
  else if (error) status = "error";
  else if (!data) status = "empty";
  else status = "success";

  return { status, movie: data, isFetching, refetch };
}
