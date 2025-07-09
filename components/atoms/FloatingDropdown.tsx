import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Animated, Modal, Pressable, ScrollView, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BodyText } from "./BodyText";

interface DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  value: number;
  onChange: (value: number) => void;
  options: number[];
  triggerRef: React.RefObject<View | null>;
  defaultValue: number;
}

export const FloatingDropdown = ({
  isOpen,
  onToggle,
  value,
  onChange,
  options,
  triggerRef,
  defaultValue,
}: DropdownProps) => {
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const dropdownOpacity = useSharedValue(0);
  const dropdownScale = useSharedValue(0.8);
  const arrowRotation = useSharedValue(0);
  const box = useThemeColor({}, "background");
  const background = useThemeColor({}, "box");

  useEffect(() => {
    if (isOpen) {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
      });

      dropdownOpacity.value = withTiming(1, { duration: 200 });
      dropdownScale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
      arrowRotation.value = withTiming(180, { duration: 200 });
    } else {
      dropdownOpacity.value = withTiming(0, { duration: 150 });
      dropdownScale.value = withTiming(0.8, { duration: 150 });
      arrowRotation.value = withTiming(0, { duration: 200 });
    }
  }, [arrowRotation, dropdownOpacity, dropdownScale, isOpen, triggerRef]);

  const dropdownStyle = useAnimatedStyle(() => ({
    opacity: dropdownOpacity.value,
    transform: [{ scale: dropdownScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const dropdownTop = triggerLayout.y + triggerLayout.height + 8;
  const dropdownLeft = triggerLayout.x;
  const dropdownWidth = triggerLayout.width;

  return (
    <View>
      <Pressable onPress={onToggle}>
        <View
          ref={triggerRef}
          style={{
            flexDirection: "row",
            padding: spacing.padding,
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: spacing.borderRadius,
            minHeight: 44,
            backgroundColor: box,
          }}
        >
          <View style={{ flexDirection: "row", gap: spacing.gap }}>
            <BodyText
              lightColor={Colors.light.textPrimary}
              darkColor={Colors.dark.textPrimary}
            >
              {value}
            </BodyText>
            {value === defaultValue && (
              <BodyText
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Default
              </BodyText>
            )}
          </View>
          <Animated.View style={arrowStyle}>
            <MaterialIcons size={18} name="keyboard-arrow-down" />
          </Animated.View>
        </View>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={onToggle}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          onPress={onToggle}
        >
          <Animated.View
            style={[
              dropdownStyle,
              {
                position: "absolute",
                top: dropdownTop,
                left: dropdownLeft,
                width: dropdownWidth,
                backgroundColor: box,
                borderRadius: spacing.borderRadius,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
                maxHeight: 200,
              },
            ]}
          >
            <ScrollView>
              {options.map((option, index) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    onChange(option);
                    onToggle();
                  }}
                  style={{
                    padding: spacing.padding,
                    borderBottomWidth: index < options.length - 1 ? 1 : 0,
                    borderBottomColor: background,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: spacing.gap }}>
                    <BodyText
                      lightColor={Colors.light.textPrimary}
                      darkColor={Colors.dark.textPrimary}
                    >
                      {option}
                    </BodyText>
                    {option === defaultValue && (
                      <BodyText
                        lightColor={
                          option === value
                            ? Colors.light.primary
                            : Colors.light.textSecondary
                        }
                        darkColor={
                          option === value
                            ? Colors.dark.primary
                            : Colors.dark.textSecondary
                        }
                      >
                        Default
                      </BodyText>
                    )}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};
