import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const CAROUSEL_ITEM_WIDTH = width;
export const DEFAULT_CAROUSEL_HEIGHT = Math.min(520, Math.round(width * 1.1));

export const INDICATOR_DOT_SIZE = 6;
export const INDICATOR_DOT_GAP = 6;

export const DEFAULT_GRADIENT_STOPS = [
  "rgba(0,0,0,0)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.95)",
];
