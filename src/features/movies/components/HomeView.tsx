import { Movie } from "@/src/lib/api/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeroCarousel } from "./HeroCarousel";
import { HomeHeader } from "./HomeHeader";
import { MovieRow } from "./MovieRow";

interface HomeViewProps {
  trending: Movie[];
  popular: Movie[];
  refreshing: boolean;
  onRefresh: () => void;
  onMoviePress: (movie: Movie) => void;
}

export function HomeView({
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

      {trending.length > 0 && (
        <HeroCarousel movies={trending.slice(0, 6)} onPress={onMoviePress} />
      )}

      {trending.length > 0 && (
        <MovieRow
          title="Trending Now"
          movies={trending.slice(0, 10)}
          onPress={onMoviePress}
          size="large"
        />
      )}

      {popular.length > 0 && (
        <MovieRow
          title="Popular Movies"
          movies={popular.slice(0, 10)}
          onPress={onMoviePress}
          size="medium"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
