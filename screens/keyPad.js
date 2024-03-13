import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useNavigation } from "../context/NavigationContext";

const KeyPad = () => {
  const { url } = useNavigation();
  console.log("Keypad", url);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.inputContainer}></View>
      <WebView style={styles.webview} source={{ uri: url }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "black",
    marginTop: -100,
    marginBottom: -40,
  },
  inputContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
  },
  webview: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});

export default KeyPad;
