import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, PressableProps } from "react-native";

import type { ComponentProps } from "react";

interface ButtonProps {
  type?: "primary" | "secondary";
  icon?: ComponentProps<typeof MaterialIcons>["name"];
  onPress?: PressableProps["onPress"];
}

export function IconButton({
  icon = "add",
  onPress,
  type = "primary",
}: ButtonProps) {
  const primary = useThemeColor({}, "primary");
  const secondary = useThemeColor({}, "secondary");
  const white = useThemeColor({}, "white");

  return (
    <Pressable
      style={({ pressed }) => ({
        padding: spacing.padding,
        aspectRatio: 1,
        borderRadius: spacing.borderRadius,
        backgroundColor: type === "secondary" ? secondary : primary,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={onPress}
      accessibilityRole="button"
    >
      <MaterialIcons name={icon} size={30} color={white} />
    </Pressable>
  );
}
