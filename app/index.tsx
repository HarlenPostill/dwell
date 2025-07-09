import { Footer } from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import { AnimatedContent } from "@/components/organisms/AnimatedContent";
import { HomePageContent } from "@/components/organisms/HomePageContent";
import { PageWrapper } from "@/components/organisms/PageWrapper";
import {
  NavigationProvider,
  PageConfig,
  TabType,
} from "@/contexts/NavigationContext";
import React from "react";

const pageConfigs: Record<TabType, PageConfig> = {
  home: {
    title: "Home",
    hasBack: false,
    component: HomePageContent,
  },
  calendar: {
    title: "Calendar",
    hasBack: false,
    component: HomePageContent,
  },
  profile: {
    title: "Profile",
    hasBack: false,
    component: HomePageContent,
  },
};

export default function HomePage() {
  return (
    <NavigationProvider pageConfigs={pageConfigs}>
      <PageWrapper>
        <Header />
        <AnimatedContent />
        <Footer />
      </PageWrapper>
    </NavigationProvider>
  );
}
