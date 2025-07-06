import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";
import { Title } from "../atoms/Title";
import { IconSymbol } from "../ui/IconSymbol";

interface HeaderProps {
  title?: string;
  hasBack?: boolean;
}

export function Header({ title, hasBack }: HeaderProps) {
  const secondary = useThemeColor({}, "secondary");
  return (
    <View
      style={{
        padding: spacing.pagePaddingHorizontal,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.gap,
      }}
    >
      {hasBack && (
        <IconSymbol size={36} name={"arrow.backward"} color={secondary} />
      )}
      <Title>{title}</Title>
    </View>
  );
}
