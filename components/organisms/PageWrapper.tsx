import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const accent = useThemeColor({}, "accent");
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: accent,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
