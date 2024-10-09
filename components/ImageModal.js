import {
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
  Pressable,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ImageModal = ({ image, visible, close }) => {
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />

        <Pressable onPress={close} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="black" />
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
