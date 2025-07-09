import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TabType, useNavigation } from "../../contexts/NavigationContext";
import { ThemedView } from "../ThemedView";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

interface FooterButtonProps {
  icon: string;
  tab: TabType;
  isSelected: boolean;
  onPress: () => void;
}

function FooterButton({ icon, tab, isSelected, onPress }: FooterButtonProps) {
  const selected = useThemeColor({}, "secondary");
  const deselected = useThemeColor({}, "secondaryAlt");

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    scale.value = withTiming(0.9, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
    onPress();
  };

  const iconColor = isSelected ? selected : deselected;

  return (
    <AnimatedTouchableOpacity
      onPress={handlePress}
      style={animatedStyle}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon as any} size={34} color={iconColor} />
    </AnimatedTouchableOpacity>
  );
}

export function Footer() {
  const { currentTab, navigateToTab, footerTranslateY, footerOpacity } =
    useNavigation();

  const background = useThemeColor({}, "background");

  const footerButtons: { icon: string; tab: TabType }[] = [
    { icon: "calendar-today", tab: "calendar" },
    { icon: "home-filled", tab: "home" },
    { icon: "account-circle", tab: "settings" },
  ];

  const tabValues = footerButtons.map((btn) => btn.tab);

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: footerTranslateY.value }],
    opacity: footerOpacity.value,
  }));

  return (
    <AnimatedThemedView
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: background,
          paddingHorizontal: 50,
          paddingTop: 20,
          paddingBottom: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        footerAnimatedStyle,
      ]}
      pointerEvents={tabValues.includes(currentTab) ? "auto" : "none"}
    >
      {footerButtons.map(({ icon, tab }) => (
        <FooterButton
          key={tab}
          icon={icon}
          tab={tab}
          isSelected={currentTab === tab}
          onPress={() => navigateToTab(tab)}
        />
      ))}
    </AnimatedThemedView>
  );
}
