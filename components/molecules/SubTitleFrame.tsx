import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { ThemedView } from "../ThemedView";
import { ButtonText } from "../atoms/ButtonText";

export function SubTitleFrame({ title }: { title?: string }) {
  return (
    <ThemedView
      lightColor={Colors.light.accent}
      darkColor={Colors.dark.accent}
      style={{
        padding: spacing.padding,
        width: "100%",
        flexDirection: "row-reverse",
        borderRadius: spacing.borderRadius,
      }}
    >
      <ButtonText>{title}</ButtonText>
    </ThemedView>
  );
}
