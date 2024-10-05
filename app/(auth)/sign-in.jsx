import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeText = (formLbl, e) => {
    setForm({ ...form, [formLbl]: e });
  };

  const handleFormSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    } else {
      setIsSubmitting(true);
      try {
        await signIn(form.email, form.password);
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", "The password you entered is incorrect.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mb-10"
          />
          <Text className="text-2xl text-white font-psemibold mb-8">
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => handleChangeText("email", e)}
            keyboardType={"email-address"}
            otherStyles={"mb-6"}
            placeholder={"Enter your email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => handleChangeText("password", e)}
            placeholder={"Enter your password"}
            otherStyles={"mb-5"}
          />
          <CustomButton
            text="sign-in"
            handlePress={handleFormSubmit}
            isLoading={isSubmitting}
            containerStyles="mb-5"
          />
          <View className="justify-center flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/sign-up"}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
