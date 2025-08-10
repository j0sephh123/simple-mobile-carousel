import { MovieSummary } from "@/src/lib/api/types";
import { Image } from "expo-image";
import React, { memo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";

type Props = {
  movie: MovieSummary;
  onPress: (movie: MovieSummary) => void;
  size?: "small" | "medium" | "large";
};

const MovieCardComponent = ({ movie, onPress, size = "medium" }: Props) => {
  const [imageError, setImageError] = useState(false);

  const getCardDimensions = () => {
    switch (size) {
      case "small":
        return { width: 120, height: 180 };
      case "large":
        return { width: 180, height: 280 };
      default:
        return { width: 140, height: 220 };
    }
  };

  const dimensions = getCardDimensions();
  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: dimensions.width, height: dimensions.height },
      ]}
      onPress={() => onPress(movie)}
      activeOpacity={0.7}
    >
      <Image
        source={
          hasPoster
            ? { uri: movie.Poster }
            : require("@/assets/images/react-logo.png")
        }
        style={[
          styles.poster,
          { width: dimensions.width, height: dimensions.height * 0.7 },
        ]}
        contentFit="cover"
        transition={200}
        onError={handleImageError}
      />
      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.title} numberOfLines={2} type="bodyMedium">
          {movie.Title}
        </ThemedText>
        <ThemedText style={styles.year} type="body">
          {movie.Year}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

function areEqual(prev: Props, next: Props) {
  return (
    prev.movie.imdbID === next.movie.imdbID &&
    prev.size === next.size &&
    prev.onPress === next.onPress
  );
}

export const MovieCard = memo(MovieCardComponent, areEqual);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  infoContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
  },
  year: {
    fontSize: 11,
    lineHeight: 14,
    opacity: 0.9,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
});
