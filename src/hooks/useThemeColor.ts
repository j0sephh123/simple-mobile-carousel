import { Colors } from "../lib/theme/colors";

export function useThemeColor(colorName: keyof typeof Colors) {
  return Colors[colorName];
}
