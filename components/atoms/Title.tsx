import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Title({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  return <Text style={[{ color }, styles.title, style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontFamily: "AsgardXBold",
    lineHeight: 42,
    letterSpacing: -0.84,
  },
});
