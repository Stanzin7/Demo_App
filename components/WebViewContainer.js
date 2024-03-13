import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";

const WebViewComponent = forwardRef((props, ref) => {
  const { url, onNavigationStateChange } = props;
  const webViewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    goBack: () => {
      if (webViewRef.current) {
        console.log("webViewRef is defined, calling goBack");
        webViewRef.current?.goBack();
      } else {
        console.log("webViewRef is not defined");
      }
    },
    goForward: () => {
      webViewRef.current?.goForward();
    },
    injectJavaScript: (script) => {
      webViewRef.current?.injectJavaScript(script);
    },
    // Include any other methods you need to expose
  }));

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: url }}
        javaScriptEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("Direct back press");
          webViewRef.current?.goBack();
        }}
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
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
    bottom: 20,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: "#000000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 6, // for Android shadow
  },
  leftFab: {
    left: 20,
  },
  rightFab: {
    right: 20,
  },
});

export default WebViewComponent;
