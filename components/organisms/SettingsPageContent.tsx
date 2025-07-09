import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/SubTitle";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { spacing } from "@/constants/Spacing";
import { useNavigation } from "@/contexts/NavigationContext";
import React from "react";
import { View } from "react-native";

export function SettingsPageContent() {
  const { navigateToTab } = useNavigation();
  return (
    <View style={{ gap: spacing.pageGap }}>
      <SubTitle>Settings</SubTitle>
      <SubTitleFrame title="Nothing is done" />
      <Button
        onPress={() => {
          navigateToTab("accountDetails");
        }}
        title="Account Details"
      />
    </View>
  );
}
