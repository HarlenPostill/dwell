import { Footer } from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import { AnimatedContent } from "@/components/organisms/AnimatedContent";
import { HomePageContent } from "@/components/organisms/HomePageContent";
import { PageWrapper } from "@/components/organisms/PageWrapper";
import { SettingsPageContent } from "@/components/organisms/SettingsPageContent";
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
  reminders: {
    title: "Reminders",
    hasBack: true,
    component: SettingsPageContent,
  },
  calendar: {
    title: "Calendar",
    hasBack: false,
    component: HomePageContent,
  },
  settings: {
    title: "Settings",
    hasBack: false,
    component: SettingsPageContent,
  },
  accountDetails: {
    title: "Account Details",
    hasBack: true,
    component: SettingsPageContent,
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
