import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const KeyPad = () => {
  const [upc, setUPC] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter UPC"
          placeholderTextColor={Colors.dark}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={setUPC}
          value={upc}
          autoFocus={true}
        /> */}
      </View>
      <WebView
        style={styles.webview}
        source={{ uri: "https://www.socksgalorews.com/cart/scanner" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "black", // Using a background color for safe area
    marginTop: -100,
    marginBottom: -40,
  },
  inputContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white", // Background color for the input container
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    color: Colors.dark,
  },
  webview: {
    flex: 1, // Take up all remaining space
    backgroundColor: Colors.light, // Same background color as the safe area
  },
});

export default KeyPad;
