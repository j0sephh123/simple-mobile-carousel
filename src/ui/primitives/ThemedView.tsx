import { View, type ViewProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

export function ThemedView({ style, ...props }: ViewProps) {
  const backgroundColor = useThemeColor("background");

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
