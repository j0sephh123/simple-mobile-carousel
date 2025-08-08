import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

const textTypes = [
  "body",
  "heading",
  "bodyMedium",
  "subheading",
  "link",
] as const;

type Props = TextProps & {
  type?: (typeof textTypes)[number];
};

export function ThemedText({ style, type = "body", ...rest }: Props) {
  const color = useThemeColor("text");

  return (
    <Text
      style={[
        { color },
        textTypes.includes(type) && styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter-Regular",
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter-Medium",
  },
  heading: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    lineHeight: 32,
  },
  subheading: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#0a7ea4",
  },
});
