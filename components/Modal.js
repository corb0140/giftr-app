import { Modal, StyleSheet, View, Pressable, Text } from "react-native";

const ModalComponent = ({ visible, close, text }) => {
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <Pressable style={styles.modalButton} onPress={close}>
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 35,
    borderRadius: 5,
    height: 200,
    width: 300,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#0075f2",
    padding: 12,
    borderRadius: 5,
    width: 150,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default ModalComponent;
