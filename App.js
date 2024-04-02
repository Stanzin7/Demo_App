import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationProvider,
  useNavigationContext,
} from "./context/NavigationContext";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import ScannerScreen from "./screens/scanner";
import "react-native-gesture-handler";
// import KeyPadScreen from "./screens/keyPad";

// <- MB      --- -> //

// <-[PLEASE ENTER URL][Go] -> //
// remember website [---]
const Stack = createStackNavigator();

const BackButton = () => {
  const { webViewRef } = useNavigationContext();
  return (
    <TouchableOpacity onPress={() => webViewRef.current?.goBack()}>
      <MaterialIcons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

const ForwardButton = () => {
  const { webViewRef } = useNavigationContext();
  return (
    <TouchableOpacity onPress={() => webViewRef.current?.goForward()}>
      <MaterialIcons name="arrow-forward" size={24} color="white" />
    </TouchableOpacity>
  );
};

const MenuButton = ({ onMenuPress }) => (
  <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
    <SimpleLineIcons name="options" size={24} color="white" />
  </TouchableOpacity>
);

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const screenOptions = {
    headerStyle: { backgroundColor: "#007AFF" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold", fontSize: 15 },
    headerTitle: "MB",
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <MenuButton onMenuPress={() => setModalVisible(!isModalVisible)} />
        <ForwardButton />
      </View>
    ),
    headerLeft: () => <BackButton />,
  };

  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName="Scanner"
          >
            <Stack.Screen name="Scanner" component={ScannerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaProvider>
  );
}

// Update styles here
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginRight: 30,
  },
});
export default App;
