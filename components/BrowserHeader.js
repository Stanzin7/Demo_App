import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const BrowserHeader = ({ onUrlSubmit, currentUrl }) => {
  const [inputValue, setInputValue] = useState(currentUrl);

  useEffect(() => {
    setInputValue(currentUrl);
  }, []);

  const handleSubmitEditing = () => {
    if (inputValue) {
      let formattedInputValue = /^(http|https):\/\//.test(inputValue)
        ? inputValue
        : `https://${inputValue}`;

      // Normalize the URL to ensure it always goes to the homepage by checking if a path is present
      const urlObject = new URL(formattedInputValue);
      if (urlObject.pathname === "/") {
        // If there is no path, set it to '/home'
        urlObject.pathname = "/home";
        formattedInputValue = urlObject.toString();
      }

      onUrlSubmit(formattedInputValue);
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
