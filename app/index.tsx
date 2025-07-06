import { SubTitle } from "@/components/atoms/SubTitle";
import { Footer } from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import { PageWrapper } from "@/components/organisms/PageWrapper";
import { ThemedView } from "@/components/ThemedView";
import { spacing } from "@/constants/Spacing";

export default function HomePage() {
  return (
    <PageWrapper>
      <Header hasBack title="Home" />
      <ThemedView
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          borderTopLeftRadius: spacing.pageBorderRadius,
          borderTopRightRadius: spacing.pageBorderRadius,
          padding: spacing.pagePaddingHorizontal,
          gap: spacing.pageGap,
        }}
      >
        <SubTitle>Sub title</SubTitle>
      </ThemedView>
      <Footer />
    </PageWrapper>
  );
}
