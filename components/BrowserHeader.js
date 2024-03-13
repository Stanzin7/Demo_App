import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const BrowserHeader = ({ onUrlSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmitEditing = () => {
    if (inputValue) {
      const formattedInputValue = inputValue.match(/^http[s]?:\/\//)
        ? inputValue
        : `https://${inputValue}`;
      onUrlSubmit(formattedInputValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Search or type web address"
        placeholderTextColor="#8E8E93"
        keyboardType="web-search"
        returnKeyType="go"
        onSubmitEditing={handleSubmitEditing}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.goButton} onPress={handleSubmitEditing}>
        <EvilIcons name="search" size={24} color="white" />
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
  goImage: {
    width: 16,
    height: 16,
  },
});

export default BrowserHeader;
