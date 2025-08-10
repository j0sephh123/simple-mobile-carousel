import {
  QueryState,
  EmptyState,
  ErrorState,
  LoadingState,
  OfflineState,
} from "@/src/ui/states";
import { HomeView } from "../../features/movies/components/HomeView";
import {
  useHomeScreen,
  HomeScreenData,
} from "../../features/movies/hooks/useHomeScreen";

export default function HomeScreen() {
  const { status, data, refreshing, handleRefresh, handleMoviePress } =
    useHomeScreen();

  return (
    <QueryState<HomeScreenData>
      status={status}
      data={data}
      views={{
        loading: <LoadingState message="Loading movies..." />,
        offline: <OfflineState />,
        empty: (
          <EmptyState
            title="No movies found"
            message="Please pull to refresh."
          />
        ),
        error: <ErrorState />,
        success: ({ trending, popular }) => (
          <HomeView
            trending={trending}
            popular={popular}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onMoviePress={handleMoviePress}
          />
        ),
      }}
    />
  );
}
