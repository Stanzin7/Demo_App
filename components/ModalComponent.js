// SetDelayModal.js
import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

const SetDelayModal = ({ isVisible, currentDelay, onClose, onSetDelay }) => {
  const [delayInput, setDelayInput] = React.useState(
    currentDelay !== undefined ? currentDelay.toString() : "0"
  );

  const handleSetDelay = () => {
    const delayInSeconds = Number(delayInput);
    if (!isNaN(delayInSeconds) && delayInSeconds > 0) {
      // Convert delay back to milliseconds before setting
      const delayInMilliseconds = delayInSeconds * 1000;
      // console.log("Setting delay to:", delayInSeconds, "seconds"); // Updated log message
      onSetDelay(delayInMilliseconds);
      onClose(); // Close the modal
    } else {
      Alert.alert("Invalid Input", "Please enter a positive number.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Set Camera Delay (seconds):</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDelayInput}
            value={delayInput}
            keyboardType="numeric"
          />
          <Button title="Set Delay" onPress={handleSetDelay} />
        </View>
      </View>
    </Modal>
  );
};

// You can reuse the styles from your Tabs.js or adjust them as needed
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SetDelayModal;
