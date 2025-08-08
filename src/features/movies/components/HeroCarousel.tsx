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
import { Movie } from "@/src/lib/api/types";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(520, Math.round(width * 1.1));

type Props = {
  movies: Movie[];
  onPress: (movie: Movie) => void;
};

export function HeroCarousel({ movies, onPress }: Props) {
  const listRef = useRef<FlatList<Movie>>(null);
  const data = useMemo(() => (movies || []).slice(0, 10), [movies]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data.length) return null;

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(item)}>
      <View style={styles.heroItem}>
        <Image
          source={{ uri: item.Poster !== "N/A" ? item.Poster : undefined }}
          style={styles.heroImage}
          contentFit="cover"
          transition={250}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.95)"]}
          style={styles.gradient}
        />
        <ThemedView style={styles.heroTextContainer}>
          <ThemedText style={styles.heroTitle} numberOfLines={1} type="heading">
            {item.Title}
          </ThemedText>
          <ThemedText style={styles.heroSub} type="body">
            {item.Year}
          </ThemedText>
        </ThemedView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        keyExtractor={(m) => m.imdbID}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {!!data.length && (
        <View style={styles.indicatorContainer} pointerEvents="none">
          {data.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.indicatorDot,
                idx === currentIndex ? styles.indicatorDotActive : undefined,
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
  indicatorDot: {
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
