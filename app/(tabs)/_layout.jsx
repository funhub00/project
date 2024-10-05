import { View, Image, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="text-center flex items-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        focused={focused}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-normal"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const tabs = ["home", "create", "contact", "bookmark", "profile"];

const icnRenderer = (tab) => {
  if (tab === "create") {
    return "plus";
  }

  if (tab === "contact") {
    return "profile";
  }
  return tab;
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopColor: "#232533",
            borderTopWidth: 1,
            height: 70,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab}
            name={tab}
            options={{
              title: tab,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  focused={focused}
                  color={color}
                  icon={`${icons[icnRenderer(tab)]}`}
                  name={tab}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;
