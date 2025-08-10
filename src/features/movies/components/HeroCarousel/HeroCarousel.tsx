import { dedupeMoviesById } from "@/src/features/movies/hooks/useHomeScreen/selectors";
import type { MovieSummary } from "@/src/lib/api/types";
import { Carousel } from "@/src/ui/carousels/Carousel";
import { CarouselImageSlide } from "@/src/ui/carousels/CarouselImageSlide";
import { CarouselIndicators } from "@/src/ui/carousels/CarouselIndicators";
import { ThemedText } from "@/src/ui/primitives/ThemedText";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { PlaceholderImage } from "../PlaceholderImage";
import { HERO_GRADIENT_STOPS, HERO_HEIGHT } from "./constants";
import { useHeroCarousel } from "./useHeroCarousel";

type Props = {
  movies: MovieSummary[];
  onPress: (movie: MovieSummary) => void;
};

export function HeroCarousel({ movies, onPress }: Props) {
  const items = useMemo(() => dedupeMoviesById(movies ?? []), [movies]);

  const { activeIndex, onIndexChange, onImageError, isPosterUsable } =
    useHeroCarousel(items);

  const handlePress = useCallback(
    (movie: MovieSummary) => () => {
      onPress(movie);
    },
    [onPress]
  );

  const handleImageError = (imdbID: string) => {
    onImageError(imdbID);
  };

  return (
    <View>
      <Carousel<MovieSummary>
        items={items}
        keyFor={(item) => `hero-${item.imdbID}`}
        height={HERO_HEIGHT}
        onIndexChange={onIndexChange}
        listTestID="hero-flatlist"
        renderItem={(item) => (
          <CarouselImageSlide
            height={HERO_HEIGHT}
            imageUri={isPosterUsable(item) ? item.Poster : undefined}
            gradientStops={HERO_GRADIENT_STOPS}
            fallback={<PlaceholderImage movie={item} />}
            onPress={handlePress(item)}
            onImageError={() => handleImageError(item.imdbID)}
            overlay={
              <View>
                <ThemedText
                  style={styles.title}
                  numberOfLines={1}
                  type="heading"
                >
                  {item.Title}
                </ThemedText>
                <ThemedText style={styles.sub} numberOfLines={1} type="body">
                  {item.Year}
                </ThemedText>
              </View>
            }
          />
        )}
      />

      <CarouselIndicators
        count={items.length}
        activeIndex={activeIndex}
        style={styles.indicators}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    lineHeight: 32,
  },
  sub: {
    marginTop: 6,
    opacity: 0.85,
  },
  indicators: {
    // Positioned absolutely within the Hero space;
    // keep consistent with your previous placement.
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
  },
});
