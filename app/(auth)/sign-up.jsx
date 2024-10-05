import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeText = (formLbl, e) => {
    setForm({ ...form, [formLbl]: e });
  };

  const handleFormSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    } else {
      setIsSubmitting(true);
      try {
        const response = await createUser(
          form.email,
          form.password,
          form.username
        );

        // set redux state
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => handleChangeText("username", e)}
            otherStyles={"mb-6"}
            placeholder={"Enter your username"}
          />
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
            text="Sign-up"
            handlePress={handleFormSubmit}
            isLoading={isSubmitting}
            containerStyles="mb-5"
          />
          <View className="justify-center flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
