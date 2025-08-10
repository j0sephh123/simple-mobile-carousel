import { useMovieDetailsQuery } from "../../movies/hooks/useMovies";
import { useRefresh } from "../../../hooks/api/useRefresh";
import { determineQueryStatus } from "@/src/hooks/api/useQueryStatus";

export function useMovieDetails(id: string) {
  const {
    data: movie,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useMovieDetailsQuery(id);

  const { refreshing, handleRefresh } = useRefresh(refetch);

  const status = determineQueryStatus({ isLoading, error, data: movie });

  return {
    status,
    movie,
    isFetching,
    refreshing,
    handleRefresh,
  };
}
