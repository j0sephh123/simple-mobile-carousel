import { MovieSummary } from "@/src/lib/api/types";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(520, Math.round(width * 1.1));

type Props = {
  movies: MovieSummary[];
  onPress: (movie: MovieSummary) => void;
};

export function HeroCarousel({ movies, onPress }: Props) {
  const listRef = useRef<FlatList<MovieSummary>>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const data = useMemo(() => (movies || []).slice(0, 6), [movies]);
  const [currentMovie, setCurrentMovie] = useState<MovieSummary | null>(null);

  if (!data.length) return null;

  const handleImageError = (imdbId: string) => {
    setImageErrors((prev) => new Set(prev).add(imdbId));
  };

  const renderItem = ({ item }: { item: MovieSummary }) => {
    const hasPoster =
      item.Poster && item.Poster !== "N/A" && !imageErrors.has(item.imdbID);

    return (
      <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(item)}>
        <View style={styles.heroItem}>
          {hasPoster ? (
            <Image
              source={{ uri: item.Poster }}
              style={styles.heroImage}
              contentFit="cover"
              transition={250}
              onError={() => handleImageError(item.imdbID)}
            />
          ) : (
            <View style={styles.fallbackBackground}>
              <View style={styles.fallbackIcon}>
                <ThemedText style={styles.fallbackIconText}>🎬</ThemedText>
              </View>
              <ThemedText style={styles.fallbackTitle} numberOfLines={2}>
                {item.Title}
              </ThemedText>
            </View>
          )}
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.95)"]}
            style={styles.gradient}
          />
          <ThemedView style={styles.heroTextContainer}>
            <ThemedText
              style={styles.heroTitle}
              numberOfLines={1}
              type="heading"
            >
              {item.Title}
            </ThemedText>
            <ThemedText style={styles.heroSub} type="body">
              {item.Year}
            </ThemedText>
          </ThemedView>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        keyExtractor={(m) => `${m.Title}-${m.Year}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentMovie(data[index] || null);
        }}
      />
      {!!data.length && (
        <View style={styles.indicatorContainer} pointerEvents="none">
          {data.map((movie) => (
            <View
              key={`${movie.Title}-${movie.Year}-indicator`}
              style={[
                styles.indicator,
                { opacity: currentMovie?.imdbID === movie.imdbID ? 1 : 0.4 },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 12,
    marginBottom: 8,
  },
  heroItem: {
    width,
    height: HERO_HEIGHT,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  fallbackBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  fallbackIcon: {
    marginBottom: 20,
  },
  fallbackIconText: {
    fontSize: 48,
  },
  fallbackTitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 28,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: HERO_HEIGHT * 0.55,
  },
  heroTextContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
  },
  heroSub: {
    marginTop: 6,
    opacity: 0.85,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  indicatorDotActive: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 10,
    borderRadius: 5,
  },
});
