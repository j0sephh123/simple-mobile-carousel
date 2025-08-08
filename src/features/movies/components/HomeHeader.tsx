import { ThemedText } from "@/src/ui/primitives/ThemedText";
import { ThemedView } from "@/src/ui/primitives/ThemedView";
import { StyleSheet } from "react-native";

export function HomeHeader() {
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerTitle} type="heading">
        A simple carousel
      </ThemedText>
      <ThemedText style={styles.headerSubtitle} type="body">
        Discover amazing movies
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});
