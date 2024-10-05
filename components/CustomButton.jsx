import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ text, containerStyles, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading && "opacity-50"
      }`}
      disabled={isLoading}
    >
      <Text className="text-primary font-psemibold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
