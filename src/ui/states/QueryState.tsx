import { Stack } from "expo-router";
import React from "react";

export type QueryStatus = "loading" | "offline" | "error" | "empty" | "success";

type Views<T> = {
  [K in QueryStatus]: K extends "success"
    ? (data: T) => React.ReactNode
    : React.ReactNode;
};

type HeaderTitleMap<T> = {
  [K in QueryStatus]?: K extends "success" ? (data: T) => string : string;
};

type QueryStateProps<T> = {
  status: QueryStatus;
  data?: T;
  headerTitle?: HeaderTitleMap<T>;
  views: Views<T>;
};

export function QueryState<T>({
  status,
  data,
  headerTitle,
  views,
}: QueryStateProps<T>) {
  const title =
    headerTitle &&
    (status === "success"
      ? headerTitle.success?.(data as T)
      : headerTitle[status]);

  return (
    <>
      {headerTitle && <Stack.Screen options={{ headerTitle: title }} />}
      {status === "loading" && views.loading}
      {status === "offline" && views.offline}
      {status === "error" && views.error}
      {status === "empty" && views.empty}
      {status === "success" && data && views.success(data)}
    </>
  );
}
