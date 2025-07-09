import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { ThemeMode, useTheme } from "@/contexts/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ThemeSelectorProps {
  style?: any;
}

export function ThemeSelector({ style }: ThemeSelectorProps) {
  const { themeMode, setThemeMode } = useTheme();
  const textPrimary = useThemeColor({}, "textPrimary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const box = useThemeColor({}, "box");

  const themeOptions: {
    value: ThemeMode;
    label: string;
    description: string;
  }[] = [
    { value: "light", label: "Light", description: "Always use light theme" },
    { value: "dark", label: "Dark", description: "Always use dark theme" },
    {
      value: "system",
      label: "System",
      description: "Follow system preference",
    },
  ];

  return (
    <View style={styles.optionsContainer}>
      {themeOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            { backgroundColor: box },
            themeMode === option.value && styles.selectedOption,
          ]}
          onPress={() => setThemeMode(option.value)}
          activeOpacity={0.7}
        >
          <View style={styles.optionContent}>
            <Text
              style={[
                styles.optionLabel,
                { color: textPrimary },
                themeMode === option.value && styles.selectedOptionLabel,
              ]}
            >
              {option.label}
            </Text>
            <Text
              style={[
                styles.optionDescription,
                { color: textSecondary },
                themeMode === option.value && styles.selectedOptionDescription,
              ]}
            >
              {option.description}
            </Text>
          </View>
          {themeMode === option.value && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.miniGap,
    color: "#333",
  },
  optionsContainer: {
    gap: spacing.gap,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.padding,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: Colors.light.primary,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  selectedOptionLabel: {
    color: Colors.light.primary,
  },
  optionDescription: {
    fontSize: 14,
  },
  selectedOptionDescription: {
    color: Colors.light.primary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
