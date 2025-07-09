import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "../../contexts/NavigationContext";
import { Title } from "../atoms/Title";
import { IconSymbol } from "../ui/IconSymbol";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export function Header() {
  const {
    currentTab,
    pageConfigs,
    headerOpacity,
    headerTranslateX,
    backButtonOpacity,
    backButtonScale,
  } = useNavigation();

  const secondary = useThemeColor({}, "secondary");
  const currentConfig = pageConfigs[currentTab];

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateX: headerTranslateX.value }],
  }));

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backButtonOpacity.value,
    transform: [{ scale: backButtonScale.value }],
  }));

  const handleBackPress = () => {
    // You can customize this behavior - maybe navigate to a specific tab
    // or implement actual navigation history
    console.log("Back button pressed");
  };

  return (
    <View
      style={{
        padding: spacing.pagePaddingHorizontal,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.gap,
      }}
    >
      <AnimatedTouchableOpacity
        onPress={handleBackPress}
        style={[
          backButtonAnimatedStyle,
          {
            width: currentConfig.hasBack ? 36 : 0,
            overflow: "hidden",
          },
        ]}
        activeOpacity={0.7}
      >
        <IconSymbol size={36} name={"arrow.backward"} color={secondary} />
      </AnimatedTouchableOpacity>

      <AnimatedView style={headerAnimatedStyle}>
        <Title>{currentConfig.title}</Title>
      </AnimatedView>
    </View>
  );
}
