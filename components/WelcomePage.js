import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BrowserHeader from "./BrowserHeader"; // Ensure this path is correct
import { useNavigationContext } from "../context/NavigationContext"; // Adjust the path as necessary
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const navigation = useNavigation();
  const { updateUrl } = useNavigationContext();

  const handleUrlSubmit = (url) => {
    console.log("URL submitted:", url);
    updateUrl(url);
    navigation.navigate("Tabs"); // Ensure "Tabs" is the correct name of the screen to navigate to
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* BrowserHeader is the first element inside the SafeAreaView */}
      <BrowserHeader onUrlSubmit={handleUrlSubmit} currentUrl="" />
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to IMX Scanner</Text>
        <Text style={styles.subtext}>Please enter the URL:</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    paddingTop: 0,
    margin: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default WelcomePage;
