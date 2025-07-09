import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BodyText } from "../atoms/BodyText";
import { FloatingDropdown } from "../atoms/FloatingDropdown";
import { IconButton } from "../atoms/IconButton";
import { SubTitle } from "../atoms/SubTitle";
import { ThemedView } from "../ThemedView";

interface ItemProps {
  itemTitle?: string;
  itemDescription?: string;
  isAdded?: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
  onFrequencyChange?: (frequency: number) => void;
  initialFrequency?: number;
}

export function Item({
  itemTitle,
  itemDescription,
  isAdded = false,
  onAdd,
  onDelete,
  onFrequencyChange,
  initialFrequency = 12,
}: ItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [frequency, setFrequency] = useState(initialFrequency);
  const dropdownTriggerRef = useRef<View>(null);

  const box = useThemeColor({}, "box");

  // Animation values
  const contentHeight = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const deleteButtonScale = useSharedValue(0);
  const deleteButtonOpacity = useSharedValue(0);

  // Dropdown options - simple array of numbers
  const frequencyOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20,
  ];
  const defaultFrequency = 12;

  const expandItem = () => {
    setIsExpanded(true);

    // Animate content expansion
    contentHeight.value = withSpring(180, {
      damping: 15,
      stiffness: 150,
    });
    contentOpacity.value = withTiming(1, { duration: 300 });

    // Animate delete button appearance
    deleteButtonScale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });
    deleteButtonOpacity.value = withTiming(1, { duration: 200 });
  };

  const collapseItem = () => {
    // Animate content collapse
    contentHeight.value = withTiming(0, { duration: 250 });
    contentOpacity.value = withTiming(0, { duration: 200 });

    // Animate delete button disappearance
    deleteButtonScale.value = withTiming(0, { duration: 200 });
    deleteButtonOpacity.value = withTiming(0, { duration: 150 });

    // Close dropdown if open
    setIsDropdownOpen(false);

    setTimeout(() => {
      runOnJS(setIsExpanded)(false);
    }, 250);
  };

  const handleAdd = () => {
    expandItem();
    onAdd?.();
  };

  const handleTune = () => {
    if (isExpanded) {
      collapseItem();
    } else {
      expandItem();
    }
  };

  const handleDelete = () => {
    collapseItem();
    onDelete?.();
  };

  const handleFrequencyChange = (newFrequency: number) => {
    setFrequency(newFrequency);
    onFrequencyChange?.(newFrequency);
  };

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
    opacity: contentOpacity.value,
    overflow: "hidden",
  }));

  const deleteButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteButtonScale.value }],
    opacity: deleteButtonOpacity.value,
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.miniGap,
        alignSelf: "flex-start",
        width: "100%",
      }}
    >
      {/* Left Icon Panel */}
      <View style={{ flexDirection: "column", gap: spacing.miniGap }}>
        {/* Show add button only if not added and not expanded */}
        {!isAdded && !isExpanded && (
          <IconButton icon="add" onPress={handleAdd} />
        )}

        {/* Show tune button if item is added (replaces add button) */}
        {isAdded && <IconButton icon="tune" onPress={handleTune} />}

        {/* Show delete button only when expanded */}
        {isExpanded && (
          <Animated.View style={deleteButtonAnimatedStyle}>
            <IconButton icon="delete" onPress={handleDelete} />
          </Animated.View>
        )}
      </View>

      {/* Right Content Panel */}
      <ThemedView
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-start",
          padding: spacing.padding,
          borderRadius: spacing.borderRadius,
          backgroundColor: box,
        }}
      >
        <SubTitle>{itemTitle}</SubTitle>
        <Animated.View style={contentAnimatedStyle}>
          <View style={{ gap: spacing.gap, marginTop: spacing.gap }}>
            <BodyText>{itemDescription}</BodyText>

            <BodyText
              lightColor={Colors.light.textPrimary}
              darkColor={Colors.dark.textPrimary}
            >
              Frequency (Days)
            </BodyText>

            <FloatingDropdown
              isOpen={isDropdownOpen}
              onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              value={frequency}
              onChange={handleFrequencyChange}
              options={frequencyOptions}
              triggerRef={dropdownTriggerRef}
              defaultValue={defaultFrequency}
            />

            <TouchableOpacity>
              <BodyText
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Learn more
              </BodyText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ThemedView>
    </View>
  );
}
