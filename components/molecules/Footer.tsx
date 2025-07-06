import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

export function Footer() {
  const secondary = useThemeColor({}, "secondary");

  return (
    <ThemedView
      style={{
        paddingHorizontal: 45,
        paddingTop: 20,
        paddingBottom: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconSymbol size={34} name={"calendar"} color={secondary} />
      <IconSymbol size={34} name={"house.fill"} color={secondary} />
      <IconSymbol size={34} name={"gearshape"} color={secondary} />
    </ThemedView>
  );
}
