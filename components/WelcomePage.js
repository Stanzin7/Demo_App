import React, { useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigationContext } from "../context/NavigationContext";
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const [userInputUrl, setUserInputUrl] = useState("");
  const { updateUrl } = useNavigationContext();
  const navigation = useNavigation();

  const handleURLSubmit = () => {
    const formattedURL = userInputUrl.match(/^http[s]?:\/\//)
      ? userInputUrl
      : `https://${userInputUrl}`;

    console.log("Submitting URL:", formattedURL);
    updateUrl(formattedURL);
    navigation.navigate("Tabs");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <Text style={styles.text}>Welcome to our App</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserInputUrl}
          value={userInputUrl}
          placeholder="Enter company URL"
          keyboardType="url"
        />
        <Button title="Go" onPress={handleURLSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
});

export default WelcomePage;
