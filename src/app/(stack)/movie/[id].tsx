import { QueryState, QueryStatus } from "@/src/ui/states/QueryState";
import { useMovieDetails } from "@/src/features/movie";
import { MovieDetail } from "@/src/lib/api/types";
import { LoadingState } from "@/src/ui/states/LoadingState";
import { OfflineState } from "@/src/ui/states/OfflineState";
import { useLocalSearchParams } from "expo-router";
import { ErrorState } from "@/src/ui/states/ErrorState";
import { EmptyState } from "@/src/ui/states/EmptyState";
import MovieView from "@/src/features/movie/components";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { status, movie, refreshing, handleRefresh } = useMovieDetails(id);

  return (
    <QueryState<MovieDetail>
      status={status as QueryStatus}
      data={movie}
      headerTitle={{
        loading: "Loading",
        offline: "Connection Error",
        error: "Error",
        empty: "Not found",
        success: ({ Title }) => Title,
      }}
      views={{
        loading: <LoadingState message="Loading movie..." />,
        offline: <OfflineState />,
        error: <ErrorState />,
        empty: <EmptyState title="Not found" message="Try another one." />,
        success: (movie) => (
          <MovieView
            movie={movie}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
          />
        ),
      }}
    />
  );
}
