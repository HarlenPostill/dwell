import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text } from "react-native";
import { ThemedTextProps } from "./Title";

export function BodyText({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textSecondary"
  );
  return <Text style={[{ color }, styles.bodyText, style]} {...rest} />;
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
    fontFamily: "SF Pro Display",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: -0.36,
  },
});
