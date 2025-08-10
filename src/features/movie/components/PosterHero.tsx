import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren, useState } from "react";
import {
  DimensionValue,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";

type Props = PropsWithChildren<{
  source: ImageSourcePropType;
  height?: DimensionValue;
  hasPoster?: boolean;
}>;

export function PosterHero({
  source,
  height = 400,
  hasPoster = true,
  children,
}: Props) {
  const [imageError, setImageError] = useState(false);
  const shouldShowFallback = !hasPoster || imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={[styles.hero, { height }]}>
      {!shouldShowFallback ? (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
          cachePolicy="disk"
          onError={handleImageError}
        />
      ) : (
        <View style={styles.fallbackBackground}>
          <View style={styles.fallbackIcon}>
            <ThemedText style={styles.fallbackIconText}>🎬</ThemedText>
          </View>
        </View>
      )}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { position: "relative", width: "100%" },
  overlay: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 20 },
  fallbackBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackIconText: {
    fontSize: 64,
  },
});
