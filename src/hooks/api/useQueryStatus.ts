import { isNetworkError } from "@/src/lib/utils";
import { QueryStatus } from "@/src/ui/states/QueryState";

export type QueryState<TData = unknown, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  data: TData | undefined;
};

export function determineQueryStatus<TData = unknown, TError = Error>(
  queries: QueryState<TData, TError> | QueryState<TData, TError>[]
): QueryStatus {
  if (Array.isArray(queries)) {
    const anyLoading = queries.some((q) => q.isLoading);
    if (anyLoading) return "loading";

    const anyNetworkError = queries.some(
      (q) => q.error && isNetworkError(q.error)
    );
    if (anyNetworkError) return "offline";

    const anyError = queries.some((q) => q.error);
    if (anyError) return "error";

    const allEmpty = queries.every(
      (q) => !q.data || (Array.isArray(q.data) && q.data.length === 0)
    );
    if (allEmpty) return "empty";

    return "success";
  } else {
    const { isLoading, error, data } = queries;

    if (isLoading) return "loading";
    if (error && isNetworkError(error)) return "offline";
    if (error) return "error";
    if (!data) return "empty";
    return "success";
  }
}
