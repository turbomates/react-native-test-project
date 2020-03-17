import React from "react";
import { Image, Picker, StyleSheet, View, Platform } from "react-native";

interface Props {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  options,
  onSelect,
  value,
  label
}) => {
  return (
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={value}
        onValueChange={value => onSelect(value)}
        style={styles.picker}
      >
        <Picker.Item key={0} label={label} value="" />
        {options.map(option => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
      {Platform.OS === "android" && (
        <Image
          style={styles.pickerArrow}
          source={require("../assets/arrow-down.png")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    height: 41,
    ...(Platform.OS !== "ios"
      ? {
          borderBottomWidth: 1,
          borderBottomColor: "#F1F4F8"
        }
      : {})
  },
  pickerArrow: {
    top: -24,
    left: 130,
    width: 12,
    height: 7
  },
  picker: {
    height: 40,
    width: 140,
    backgroundColor: "#FFFFFF"
  }
});
