import { Button } from "@/components/atoms/Button";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { spacing } from "@/constants/Spacing";
import { useNavigation } from "@/contexts/NavigationContext";
import React from "react";
import { View } from "react-native";
import { ThemeSelector } from "../molecules/ThemeSelector";

export function SettingsPageContent() {
  const { navigateToTab } = useNavigation();
  return (
    <View style={{ gap: spacing.pageGap }}>
      <SubTitleFrame title="General" />
      <ThemeSelector />
      <Button
        onPress={() => {
          navigateToTab("accountDetails");
        }}
        title="Account Details"
      />
    </View>
  );
}
