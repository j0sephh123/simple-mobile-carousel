import { MovieDetail } from "@/src/lib/api/types";
import { Colors } from "@/src/lib/theme/colors";
import { StyleSheet } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { PosterHero } from "./PosterHero";
import { RatingBadge } from "./RatingBadge";

type Props = Pick<
  MovieDetail,
  "Title" | "Poster" | "imdbRating" | "Year" | "Runtime" | "Rated"
>;

export function MovieHero({
  Title,
  Poster,
  imdbRating,
  Year,
  Runtime,
  Rated,
}: Props) {
  const src =
    Poster !== "N/A" ? { uri: Poster } : require("@/assets/images/icon.png");

  const meta = [Year, Runtime, Rated]
    .filter((v) => v && v !== "N/A")
    .join(" • ");

  return (
    <PosterHero source={src}>
      <ThemedText style={styles.title}>{Title}</ThemedText>
      <ThemedText style={styles.meta}>{meta}</ThemedText>
      <RatingBadge rating={imdbRating} />
    </PosterHero>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: Colors.tint,
    marginBottom: 8,
  },
  meta: {
    fontSize: 16,
    color: Colors.icon,
    marginBottom: 8,
  },
});
