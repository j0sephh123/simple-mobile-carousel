import { MovieSummary } from "@/src/lib/api/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeroCarousel } from "./HeroCarousel";
import { HomeHeader } from "./HomeHeader";
import { MovieRow } from "./MovieRow";

interface HomeViewProps {
  featured: MovieSummary[];
  trending: MovieSummary[];
  popular: MovieSummary[];
  refreshing: boolean;
  onRefresh: () => void;
  onMoviePress: (movie: MovieSummary) => void;
}

export function HomeView({
  featured,
  trending,
  popular,
  refreshing,
  onRefresh,
  onMoviePress,
}: HomeViewProps) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 28,
        paddingBottom:
          Platform.OS === "ios" ? insets.bottom + tabBarHeight : insets.bottom,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HomeHeader />
      <HeroCarousel movies={featured} onPress={onMoviePress} />
      <MovieRow
        title="Trending Now"
        movies={trending}
        onPress={onMoviePress}
        size="large"
        collectionKey="trending"
      />
      <MovieRow
        title="Popular Movies"
        movies={popular}
        onPress={onMoviePress}
        size="medium"
        collectionKey="popular"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
