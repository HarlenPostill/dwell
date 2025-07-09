import { spacing } from "@/constants/Spacing";
import { ScrollView, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "../../contexts/NavigationContext";
import { ThemedView } from "../ThemedView";

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

export function AnimatedContent() {
  const { currentTab, pageConfigs, contentOpacity, contentTranslateX } =
    useNavigation();

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateX: contentTranslateX.value }],
  }));

  const CurrentPageComponent = pageConfigs[currentTab].component;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: spacing.tabHeight,
          paddingTop: spacing.pagePaddingVertical,
        }}
      >
        <AnimatedView style={contentAnimatedStyle}>
          <CurrentPageComponent />
        </AnimatedView>
      </ScrollView>
    </ThemedView>
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
    paddingTop: 0,
  },
});
