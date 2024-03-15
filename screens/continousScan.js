// import React, { useState, useRef, useEffect } from "react";
// import { SafeAreaView, StyleSheet, Alert, View, Text } from "react-native";
// import BarcodeScanner from "../components/BarcodeScanner";
// import WebView from "react-native-webview";
// import { useNavigationContext } from "../context/NavigationContext";
// import BrowserHeader from "../components/BrowserHeader";

// const ContinuousScanner = () => {
//   const webViewRef = useRef(null);
//   const { url, updateUrl, cameraEnabled, setCameraEnabled } =
//     useNavigationContext();
//   const [isContinuousScanning, setIsContinuousScanning] = useState(false);

//   useEffect(() => {
//     // Enable camera and start continuous scanning when the component mounts
//     setCameraEnabled(true);
//     setIsContinuousScanning(true);

//     // Cleanup function to disable camera and scanning when the component unmounts
//     return () => {
//       setCameraEnabled(false);
//       setIsContinuousScanning(false);
//     };
//   }, [setCameraEnabled]);

//   const handleScanData = (data) => {
//     if (isContinuousScanning) {
//       // Process scanning data and perform continuous scans here
//       let newData = data.startsWith("0") ? data.substring(1) : data;
//       const script = `
//         (function() {
//           var input = document.querySelector("input[formControlName='search']");
//           if (input) {
//             input.value = '${newData}';
//             input.dispatchEvent(new Event('input', { bubbles: true }));

//             // Submit the form to complete the scan
//             var form = input.closest('form');
//             if (form) {
//               form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
//             }
//             // For continuous scanning, don't blur the input
//             // input.blur(); // Comment this line to keep focus for continuous scanning
//           }
//         })();
//         true;
//       `;

//       webViewRef.current?.injectJavaScript(script);
//     }
//   };

//   const handleNavigationStateChange = (navState) => {
//     const newUrl = navState.url;
//     // Only update the URL if it has actually changed
//     if (url !== newUrl) {
//       updateUrl(newUrl);
//       const isScannerPage = newUrl.includes("/cart/scanner");
//       setCameraEnabled(isScannerPage);
//     }
//   };
//   // Handle WebView load errors
//   const handleWebViewError = (error) => {
//     Alert.alert(
//       "Load Error",
//       "Failed to load the page. Please check the URL or your network connection."
//     );
//   };

//   // Handle HTTP errors
//   const handleHttpError = (syntheticEvent) => {
//     const { nativeEvent } = syntheticEvent;
//     Alert.alert(
//       "HTTP Error",
//       `The page failed to load (HTTP status code: ${nativeEvent.statusCode}).`
//     );
//   };
//   const isHomepage = url.endsWith("/home") || url.endsWith("/");

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <BrowserHeader onUrlSubmit={updateUrl} currentUrl={url} />
//       {/* Show BarcodeScanner if cameraEnabled and continuous scanning is active */}
//       {cameraEnabled && isContinuousScanning && (
//         <BarcodeScanner onScan={handleScanData} />
//       )}
//       <WebView
//         ref={webViewRef}
//         source={{ uri: url }}
//         style={{ flex: 1 }}
//         javaScriptEnabled={true}
//         onNavigationStateChange={handleNavigationStateChange}
//         onError={handleWebViewError}
//         onHttpError={handleHttpError}
//       />
//       {/* A visual indicator for the continuous scanning mode could be useful */}
//       {isContinuousScanning && (
//         <View style={styles.continuousScanningIndicator}>
//           <Text>Continuous Scanning Mode</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   continuousScanningIndicator: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   // ... Other styles if necessary
// });

// export default ContinuousScanner;
