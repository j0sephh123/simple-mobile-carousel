import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import type { CarouselIndicatorsProps } from "./types";
import { INDICATOR_DOT_GAP, INDICATOR_DOT_SIZE } from "./constants";

export function CarouselIndicators({
  count,
  activeIndex,
  onDotPress,
  style,
}: CarouselIndicatorsProps) {
  if (count <= 1) return null;

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <TouchableOpacity
            key={`dot-${i}`}
            style={[
              styles.dot,
              isActive && styles.dotActive,
              { width: isActive ? INDICATOR_DOT_SIZE + 4 : INDICATOR_DOT_SIZE },
            ]}
            disabled={!onDotPress}
            onPress={() => onDotPress?.(i)}
            testID="hero-indicator"
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: INDICATOR_DOT_GAP,
  },
  dot: {
    height: INDICATOR_DOT_SIZE,
    borderRadius: INDICATOR_DOT_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: INDICATOR_DOT_GAP / 2,
  },
  dotActive: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
});
