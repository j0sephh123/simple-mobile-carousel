import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const HERO_HEIGHT = Math.min(520, Math.round(width * 1.1));

export const HERO_GRADIENT_STOPS = [
  "rgba(0,0,0,0)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.95)",
];
