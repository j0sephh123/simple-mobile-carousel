import { MovieDetail } from "@/src/lib/api";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../../../ui/primitives/ThemedText";
import { ThemedView } from "../../../ui/primitives/ThemedView";

type SectionProps = {
  title: string;
  label: string;
};

const Section = ({ title, label }: SectionProps) => (
  <ThemedView style={styles.section}>
    <ThemedText style={styles.sectionTitle} type="subheading">
      {title}
    </ThemedText>
    <ThemedText style={styles.plot} type="body">
      {label}
    </ThemedText>
  </ThemedView>
);

type MovieDetailsProps = Pick<MovieDetail, "Plot" | "Genre">;

export const MovieDetails = ({ Plot, Genre }: MovieDetailsProps) => {
  return (
    <ThemedView style={styles.contentSection}>
      <Section title="Plot" label={Plot} />
      <Section title="Genre" label={Genre} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  contentSection: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
  },
  genre: {
    fontSize: 16,
    lineHeight: 24,
  },
});
