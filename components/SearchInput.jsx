import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import CustomButton from "./CustomButton";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTouchablePress = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="w-full h-16 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular px-3"
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5 mr-3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
