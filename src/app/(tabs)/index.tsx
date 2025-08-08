import { QueryState } from "@/src/features/common/QueryState";
import { EmptyState } from "@/src/ui/feedback/EmptyState";
import { ErrorState } from "@/src/ui/feedback/ErrorState";
import { Loading } from "@/src/ui/feedback/Loading";
import { OfflineState } from "@/src/ui/feedback/OfflineState";
import React from "react";
import { HomeView } from "../../features/movies/components/HomeView";
import { useHomeScreen } from "../../features/movies/hooks/useHomeScreen";

export default function HomeScreen() {
  const { status, data, refreshing, handleRefresh, handleMoviePress } =
    useHomeScreen();

  return (
    <QueryState
      status={status}
      data={data}
      onRetry={handleRefresh}
      views={{
        Loading: <Loading fullscreen message="Loading movies..." />,
        Offline: (
          <OfflineState
            title="No connection"
            message="Please check your internet connection and try again."
            onRetry={handleRefresh}
          />
        ),
        Empty: (
          <EmptyState
            title="No movies found"
            message="Please pull to refresh."
          />
        ),
        Error: <ErrorState onRetry={handleRefresh} />,
      }}
    >
      {({ trending, popular }) => (
        <HomeView
          trending={trending}
          popular={popular}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onMoviePress={handleMoviePress}
        />
      )}
    </QueryState>
  );
}
