import { useRefresh } from "@/src/hooks/api/useRefresh";

type RefetchFn = () => Promise<unknown>;

export function useHomeRefresh(
  refetchFeatured: RefetchFn,
  refetchTrending: RefetchFn,
  refetchPopular: RefetchFn
) {
  return useRefresh(async () => {
    await Promise.all([refetchFeatured(), refetchTrending(), refetchPopular()]);
  });
}
