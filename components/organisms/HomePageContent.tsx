import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/SubTitle";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { spacing } from "@/constants/Spacing";
import { useNavigation } from "@/contexts/NavigationContext";
import React from "react";
import { View } from "react-native";
import { Item } from "../molecules/Item";

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
      <Item itemTitle="New Workout" itemDescription="Daily exercise routine" />
      <Item
        itemTitle="My Workout"
        itemDescription="The reminders of something like that you know whats going on right?"
      />
      <Button
        onPress={() => {
          navigateToTab("reminders");
        }}
        title="Edit Reminders"
      />
    </View>
  );
}
