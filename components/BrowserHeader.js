import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BrowserHeader = ({ onUrlSubmit, currentUrl }) => {
  const [inputValue, setInputValue] = useState(currentUrl);

  // Load the last entered URL from AsyncStorage when the component mounts
  useEffect(() => {
    const loadLastUrl = async () => {
      try {
        const lastUrl = await AsyncStorage.getItem("lastUrl");
        if (lastUrl) {
          setInputValue(lastUrl);
          console.log("URL loaded:", lastUrl); // Moved inside the try block
        }
      } catch (error) {
        console.error("Error loading the URL from AsyncStorage:", error);
      }
    };

    loadLastUrl();
  }, []);

  const handleSubmitEditing = async () => {
    if (inputValue) {
      try {
        let formattedInputValue = /^(http|https):\/\//.test(inputValue)
          ? inputValue
          : `https://${inputValue}`;
        // Attempt to create a URL object to validate the URL
        const urlObject = new URL(formattedInputValue);
        if (urlObject.pathname === "/") {
          urlObject.pathname = "/home";
          formattedInputValue = urlObject.toString();
        }
        console.log("URL saved:", formattedInputValue);

        // If successful, submit the URL and save it
        onUrlSubmit(formattedInputValue);
        await AsyncStorage.setItem("lastUrl", formattedInputValue);
      } catch (error) {
        // Handle invalid URL error, e.g., show an alert or log
        console.error("Invalid URL:", error.message);
        // Optionally, inform the user the URL is invalid
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Search Google or type a URL"
        placeholderTextColor="#8E8E93"
        keyboardType="web-search"
        returnKeyType="go"
        onSubmitEditing={handleSubmitEditing}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.goButton} onPress={handleSubmitEditing}>
        <Text style={styles.goText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 36,
    backgroundColor: "#EFEFF4",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    color: "#000",
  },
  goButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  goText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default BrowserHeader;
