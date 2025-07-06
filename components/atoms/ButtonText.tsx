import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text } from "react-native";
import { ThemedTextProps } from "./Title";

export function ButtonText({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  return <Text style={[{ color }, styles.buttonText, style]} {...rest} />;
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 22,
    fontFamily: "SF Pro Display",
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.44,
  },
});
