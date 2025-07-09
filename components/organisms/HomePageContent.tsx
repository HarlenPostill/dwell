import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/SubTitle";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { spacing } from "@/constants/Spacing";
import { useNavigation } from "@/contexts/NavigationContext";
import React from "react";
import { View } from "react-native";

export function HomePageContent() {
  const { navigateToTab } = useNavigation();

  return (
    <View style={{ gap: spacing.pageGap }}>
      <SubTitle>Todays the day!</SubTitle>
      <Button
        onPress={() => {
          navigateToTab("reminders");
        }}
        title="Add Reminders"
      />
      <SubTitleFrame title="High Priority" />
      <Button
        onPress={() => {
          navigateToTab("reminders");
        }}
        title="Edit Reminders"
      />
    </View>
  );
}
