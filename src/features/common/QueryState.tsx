import { EmptyState } from "@/src/ui/feedback/EmptyState";
import { ErrorState } from "@/src/ui/feedback/ErrorState";
import { Loading } from "@/src/ui/feedback/Loading";
import { OfflineState } from "@/src/ui/feedback/OfflineState";
import { Stack } from "expo-router";
import React from "react";

export type QueryStatus = "loading" | "offline" | "error" | "empty" | "success";

type HeaderTitleMap<T> = {
  loading?: string;
  offline?: string;
  error?: string;
  empty?: string;
  success: (data: T) => string;
};

type QueryStateProps<T> = {
  status: QueryStatus;
  data?: T;
  onRetry?: () => void;
  headerTitle?: HeaderTitleMap<T>;
  children: (data: T) => React.ReactNode;
  views?: Partial<{
    Loading: React.ReactNode;
    Offline: React.ReactNode;
    Error: React.ReactNode;
    Empty: React.ReactNode;
  }>;
};

export function QueryState<T>({
  status,
  data,
  onRetry,
  headerTitle,
  children,
  views,
}: QueryStateProps<T>) {
  const title =
    headerTitle &&
    (status === "success"
      ? headerTitle.success(data as T)
      : (headerTitle as any)[status]);

  return (
    <>
      {headerTitle && <Stack.Screen options={{ headerTitle: title }} />}

      {status === "loading" &&
        (views?.Loading ?? <Loading fullscreen message="Loading" />)}

      {status === "offline" &&
        (views?.Offline ?? (
          <OfflineState
            title="Connection failed"
            message="Please check your internet connection."
            onRetry={onRetry}
          />
        ))}

      {status === "error" &&
        (views?.Error ?? (
          <ErrorState
            title="Something went wrong"
            message="Please try again."
            onRetry={onRetry}
          />
        ))}

      {status === "empty" &&
        (views?.Empty ?? (
          <EmptyState title="Not found" message="Try another one." />
        ))}

      {status === "success" && data ? <>{children(data)}</> : null}
    </>
  );
}
