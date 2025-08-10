import { MovieSummary } from "@/src/lib/api/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
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
        paddingBottom: insets.bottom + tabBarHeight + 8,
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
      />
      <MovieRow
        title="Popular Movies"
        movies={popular}
        onPress={onMoviePress}
        size="medium"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
