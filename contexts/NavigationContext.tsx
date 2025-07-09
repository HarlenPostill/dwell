import React, { createContext, ReactNode, useContext } from "react";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

export type TabType =
  | "calendar"
  | "home"
  | "settings"
  | "accountDetails"
  | "reminders";

export interface PageConfig {
  title: string;
  hasBack: boolean;
  component: React.ComponentType;
}

interface NavigationContextType {
  currentTab: TabType;
  navigateToTab: (tab: TabType) => void;
  pageConfigs: Record<TabType, PageConfig>;
  // Animation values
  headerOpacity: any;
  headerTranslateX: any;
  contentOpacity: any;
  contentTranslateX: any;
  backButtonOpacity: any;
  backButtonScale: any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
  pageConfigs: Record<TabType, PageConfig>;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  pageConfigs,
}) => {
  const [currentTab, setCurrentTab] = React.useState<TabType>("home");

  const headerOpacity = useSharedValue(1);
  const headerTranslateX = useSharedValue(0);
  const contentOpacity = useSharedValue(1);
  const contentTranslateX = useSharedValue(0);
  const backButtonOpacity = useSharedValue(pageConfigs.home.hasBack ? 1 : 0);
  const backButtonScale = useSharedValue(pageConfigs.home.hasBack ? 1 : 0);

  const navigateToTab = (newTab: TabType) => {
    if (newTab === currentTab) return;

    const currentConfig = pageConfigs[currentTab];
    const newConfig = pageConfigs[newTab];

    // Determine slide direction based on tab order
    const tabOrder: TabType[] = ["calendar", "home", "settings"];
    const currentIndex = tabOrder.indexOf(currentTab);
    const newIndex = tabOrder.indexOf(newTab);
    const slideDirection = newIndex > currentIndex ? 1 : -1;

    // Header animation
    headerOpacity.value = withTiming(0, { duration: 150 });
    headerTranslateX.value = withTiming(
      -slideDirection * 30,
      { duration: 150 },
      () => {
        runOnJS(setCurrentTab)(newTab);
        headerTranslateX.value = slideDirection * 30;
        headerOpacity.value = withTiming(1, { duration: 200 });
        headerTranslateX.value = withTiming(0, { duration: 200 });
      }
    );

    // Content animation
    contentOpacity.value = withTiming(0, { duration: 150 });
    contentTranslateX.value = withTiming(
      -slideDirection * 50,
      { duration: 150 },
      () => {
        contentTranslateX.value = slideDirection * 50;
        contentOpacity.value = withTiming(1, { duration: 200 });
        contentTranslateX.value = withTiming(0, { duration: 200 });
      }
    );

    // Back button animation
    if (currentConfig.hasBack !== newConfig.hasBack) {
      if (newConfig.hasBack) {
        backButtonOpacity.value = withTiming(1, { duration: 200 });
        backButtonScale.value = withTiming(1, { duration: 200 });
      } else {
        backButtonOpacity.value = withTiming(0, { duration: 150 });
        backButtonScale.value = withTiming(0, { duration: 150 });
      }
    }
  };

  const value: NavigationContextType = {
    currentTab,
    navigateToTab,
    pageConfigs,
    headerOpacity,
    headerTranslateX,
    contentOpacity,
    contentTranslateX,
    backButtonOpacity,
    backButtonScale,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
