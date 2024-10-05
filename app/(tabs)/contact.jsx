import React, { useEffect, useCallback, useState } from "react";
import { View, Button, Alert, Text } from "react-native";
import { useForm } from "react-hook-form";
import FormField from "../../components/FormField";

const Contact = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [form, setForm] = useState({
    email: "",
    name: "",
    message: "",
  });

  const onSubmit = useCallback(async (event) => {
    let formData = event;
    Object.assign(formData, {
      access_key: "3a50e0e2-7d5d-4f63-81f6-4f7775b57b6c",
    });
    const json = JSON.stringify(formData);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Alert.alert("Message sent successfully!");
      setForm({
        email: "",
        name: "",
        message: "",
      });
    }
  }, []);

  const onChangeField = (name, text) => {
    setValue(name, text);
    setForm({ ...form, [name]: text });
  };

  useEffect(() => {
    register("email");
    register("name");
    register("message");
  }, [register]);

  return (
    <View className="bg-primary h-full justify-center px-6">
      <Text className="text-2xl text-white font-psemibold mb-8">
        Contact Form
      </Text>
      <FormField
        value={form.email}
        title="Email"
        handleChangeText={(e) => onChangeField("email", e)}
        keyboardType={"email-address"}
        otherStyles={"mb-6"}
        placeholder={"Enter your email"}
      />
      <FormField
        value={form.name}
        title="Name"
        handleChangeText={(e) => onChangeField("name", e)}
        otherStyles={"mb-6"}
        placeholder={"Enter your name"}
      />
      <FormField
        value={form.message}
        title="Message"
        handleChangeText={(e) => onChangeField("message", e)}
        otherStyles={"mb-6"}
        placeholder={"Enter your message"}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
export default Contact;
