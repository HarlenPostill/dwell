import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/SubTitle";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { spacing } from "@/constants/Spacing";
import React from "react";
import { View } from "react-native";

export function HomePageContent() {
  return (
    <View style={{ gap: spacing.pageGap }}>
      <SubTitle>Todays the day!</SubTitle>
      <SubTitleFrame title="Nothing is done" />
      <Button title="Add Reminders" />
    </View>
  );
}
