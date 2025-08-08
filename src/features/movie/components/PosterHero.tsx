import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import {
  DimensionValue,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

type Props = PropsWithChildren<{
  source: ImageSourcePropType;
  height?: DimensionValue;
}>;

export function PosterHero({ source, height = 400, children }: Props) {
  return (
    <View style={[styles.hero, { height }]}>
      <Image
        source={source}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
        cachePolicy="disk"
      />
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
});
