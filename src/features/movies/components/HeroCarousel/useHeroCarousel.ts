import { useCallback, useMemo, useState } from "react";
import type { MovieSummary } from "@/src/lib/api/types";

export function useHeroCarousel(movies: MovieSummary[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const onIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onImageError = useCallback((imdbID: string) => {
    setImageErrors((prev) => {
      const next = new Set(prev);
      next.add(imdbID);
      return next;
    });
  }, []);

  const isPosterUsable = useCallback(
    (m: MovieSummary) =>
      Boolean(m.Poster) && m.Poster !== "N/A" && !imageErrors.has(m.imdbID),
    [imageErrors]
  );

  const currentMovie = useMemo(
    () => movies[activeIndex] ?? null,
    [movies, activeIndex]
  );

  return {
    activeIndex,
    onIndexChange,
    onImageError,
    isPosterUsable,
    currentMovie,
  };
}
