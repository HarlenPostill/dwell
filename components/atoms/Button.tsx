import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps } from "react-native";
import { ButtonText } from "./ButtonText";

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onPress?: PressableProps["onPress"];
}

export function Button({ title, disabled = false, onPress }: ButtonProps) {
  const primary = useThemeColor({}, "primary");
  const box = useThemeColor({}, "box");
  const white = useThemeColor({}, "white");
  const textSecondary = useThemeColor({}, "textSecondary");

  const getBackgroundColor = () => {
    if (disabled) {
      return box;
    }
    return primary;
  };

  const getTextColor = () => {
    if (disabled) {
      return textSecondary;
    }
    return white;
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        padding: spacing.padding,
        borderRadius: spacing.borderRadius,
        backgroundColor: getBackgroundColor(),
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
      })}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <ButtonText lightColor={getTextColor()} darkColor={getTextColor()}>
        {title}
      </ButtonText>
    </Pressable>
  );
}
