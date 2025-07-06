import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text } from "react-native";
import { ThemedTextProps } from "./Title";

export function SubTitle({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  return <Text style={[{ color }, styles.subTitle, style]} {...rest} />;
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 28,
    fontFamily: "AsgardBold",
    lineHeight: 28,
    letterSpacing: -0.56,
  },
});
