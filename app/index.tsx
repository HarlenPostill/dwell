import { Button } from "@/components/atoms/Button";
import { SubTitle } from "@/components/atoms/SubTitle";
import { Footer } from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import { SubTitleFrame } from "@/components/molecules/SubTitleFrame";
import { PageWrapper } from "@/components/organisms/PageWrapper";
import { ThemedView } from "@/components/ThemedView";
import { spacing } from "@/constants/Spacing";

import { StyleSheet } from "react-native";

export default function HomePage() {
  return (
    <PageWrapper>
      <Header hasBack title="Home" />
      <ThemedView style={styles.container}>
        <SubTitle>Todays the day!</SubTitle>
        <SubTitleFrame title="Nothing is done" />
        <Button title="Add Reminders" />
      </ThemedView>
      <Footer />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderTopLeftRadius: spacing.pageBorderRadius,
    borderTopRightRadius: spacing.pageBorderRadius,
    padding: spacing.pagePaddingHorizontal,
    gap: spacing.pageGap,
  },
});
