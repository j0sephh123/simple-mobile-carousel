import React, { useMemo, useRef } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { CAROUSEL_ITEM_WIDTH } from "./constants";
import type { CarouselProps } from "./types";

export function Carousel<T>({
  items,
  keyFor,
  renderItem,
  height,
  initialIndex = 0,
  onIndexChange,
  listTestID,
}: CarouselProps<T>) {
  const viewabilityConfig = useMemo(
    () => ({ viewAreaCoveragePercentThreshold: 60 }),
    []
  );

  const listRef = useRef<FlatList<T>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
      const first = viewableItems[0]?.index ?? 0;
      onIndexChange?.(first);
    }
  ).current;

  const getItemLayout = (
    _: ArrayLike<T> | null | undefined,
    index: number
  ) => ({
    length: CAROUSEL_ITEM_WIDTH,
    offset: CAROUSEL_ITEM_WIDTH * index,
    index,
  });

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / CAROUSEL_ITEM_WIDTH);
    onIndexChange?.(index);
  };

  return (
    <View style={[styles.container, height ? { height } : null]}>
      <FlatList
        ref={listRef}
        data={items}
        keyExtractor={(item, index) => keyFor(item, index)}
        renderItem={({ item, index }) =>
          renderItem(item, index) as React.ReactElement | null
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={handleMomentumEnd}
        style={styles.list}
        testID={listTestID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CAROUSEL_ITEM_WIDTH,
  },
  list: {
    flexGrow: 0,
  },
});
