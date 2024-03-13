// WebViewContainer.js
import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WebView from "react-native-webview";

const WebViewContainer = ({ webViewUrl, onNavigationStateChange }) => {
  const webViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: webViewUrl }}
        javaScriptEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
      />
      <TouchableOpacity
        onPress={() => webViewRef.current?.goBack()}
        style={[styles.fab, styles.leftFab]}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => webViewRef.current?.goForward()}
        style={[styles.fab, styles.rightFab]}
      >
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    width: "100%",
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: "#000000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 6,
  },
  leftFab: {
    bottom: 20,
    left: 20,
  },
  rightFab: {
    bottom: 20,
    right: 20,
  },
});

export default WebViewContainer;
