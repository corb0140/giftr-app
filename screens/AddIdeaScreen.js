import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

import PeopleContext from "../PeopleContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, Camera } from "expo-camera";
import uuid from "react-native-uuid";

import { useEffect, useState, useRef } from "react";
import ModalComponent from "../components/Modal";

// Calculate image size
const aspectRatio = 2 / 3;
const screenWidth = Dimensions.get("window").width;
const imageWidth = Math.round(screenWidth * 0.5);
const imageHeight = Math.round(screenWidth * aspectRatio);

const AddIdeaScreen = ({ route }) => {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { addPersonIdeas } = useContext(PeopleContext);

  //camera
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  //useStates / useRefs
  const [idea, setIdea] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const sizes = await cameraRef.current
        .getAvailablePictureSizesAsync()
        .then((sizes) => {
          console.log(sizes);
        });

      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      setPhoto(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addIdeaHandler = () => {
    if (idea === "" || photo === null) {
      setModalVisible(true);
    } else {
      addPersonIdeas({
        id: id,
        idea: {
          id: uuid.v4(),
          idea: idea,
          img: photo,
          imageWidth: imageWidth,
          imageHeight: imageHeight,
        },
      }),
        navigation.navigate("Idea", {
          id: id,
          name: name,
        });
    }
  };

  const resetFormHandler = () => {
    setIdea("");
    setPhoto(null);
    navigation.navigate("People", {
      id: id,
      name: name,
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.textView}>
          <Text style={styles.heading}>Add Idea for {name}</Text>
        </View>

        <View style={styles.formView}>
          <View>
            <Text style={{ paddingBottom: 5 }}>Gift idea</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setIdea(text)}
            />
          </View>

          {!photo ? (
            <CameraView style={styles.camera} ref={cameraRef}>
              <View style={styles.cameraButtonContainer}>
                <Pressable title="Take Picture" onPress={takePicture}>
                  <AntDesign name="camera" size={50} color="white" />
                </Pressable>
              </View>
            </CameraView>
          ) : (
            <Image source={{ uri: photo }} style={styles.image} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#0075f2" }]}
            onPress={addIdeaHandler}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#d10000" }]}
            onPress={resetFormHandler}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {modalVisible && (
        <ModalComponent
          text="Please add an idea and an image"
          visible={modalVisible}
          close={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AddIdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textView: {
    paddingLeft: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBlockColor: "#1a1a1a",
    marginBottom: 20,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    padding: 12,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    textTransform: "uppercase",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  camera: {
    width: imageWidth,
    height: imageHeight,
  },
  cameraButtonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
