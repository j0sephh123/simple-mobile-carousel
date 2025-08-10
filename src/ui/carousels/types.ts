import type { ReactNode } from "react";

export type KeyFor<T> = (item: T, index: number) => string;
export type RenderSlide<T> = (item: T, index: number) => ReactNode;

export type CarouselProps<T> = {
  items: T[];
  keyFor: KeyFor<T>;
  renderItem: RenderSlide<T>;
  height?: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  listTestID?: string;
};

export type CarouselIndicatorsProps = {
  count: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
  style?: object;
};

export type CarouselImageSlideProps = {
  imageUri?: string;
  height: number;
  gradientStops: string[];
  fallback: ReactNode;
  overlay?: ReactNode;
  onPress: () => void;
  onImageError: () => void;
};
