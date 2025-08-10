import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { DEFAULT_GRADIENT_STOPS } from "./constants";
import type { CarouselImageSlideProps } from "./types";

const { width } = Dimensions.get("window");

export function CarouselImageSlide({
  imageUri,
  height,
  gradientStops = DEFAULT_GRADIENT_STOPS,
  fallback,
  overlay,
  onPress,
  onImageError,
}: CarouselImageSlideProps) {
  const gradientHeight = Math.round(height * 0.55);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <View style={[styles.slide, { width, height }]}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="cover"
            transition={250}
            onError={onImageError}
          />
        ) : (
          <View style={styles.fallback}>{fallback}</View>
        )}
        <LinearGradient
          colors={gradientStops as [string, string, ...string[]]}
          style={[styles.gradient, { height: gradientHeight }]}
        />
        <View style={styles.overlay}>{overlay}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  slide: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
});
