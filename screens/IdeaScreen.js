import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageModal from "../components/ImageModal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const IdeaScreen = ({ route }) => {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { deletePersonIdea } = useContext(PeopleContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [storeImage, setStoreImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const storeImageHandler = (image, id) => {
    if (id && image) {
      setStoreImage(image);
    }
  };

  const deletePersonIdeaHandler = (ideaId) => {
    deletePersonIdea({ id: id, ideaId: ideaId });
  };

  useEffect(() => {
    const getDimensions = async () => {
      const storedWidth = await AsyncStorage.getItem("width");
      const storedHeight = await AsyncStorage.getItem("height");

      setDimensions({
        width: JSON.parse(storedWidth) / 1.5,
        height: JSON.parse(storedHeight) / 1.5,
      });
    };
    getDimensions();
  }, []);

  const { people } = useContext(PeopleContext);

  const personIdeas = people.find((person) => person.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.heading}>Ideas for {name}</Text>
      </View>

      <View style={styles.ideaListView}>
        {personIdeas && personIdeas.ideas.length === 0 ? (
          <View style={styles.ideaListMessageView}>
            <Text style={styles.ideaListMessage}>No Ideas Added Yet</Text>
          </View>
        ) : (
          <FlatList
            style={{ marginBottom: 80 }}
            data={personIdeas?.ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ideaListItem}>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    storeImageHandler(item.img, item.id);
                  }}
                >
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      width: dimensions.width,
                      height: dimensions.height,
                    }}
                  />
                </Pressable>

                <View style={styles.ideaListNameAndButton}>
                  <Text style={styles.ideaName}>{item.idea}</Text>

                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => {
                      deletePersonIdeaHandler(item.id);
                    }}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Pressable
        style={styles.addIdeaButton}
        onPress={() => {
          navigation.navigate("AddIdea", { id: id, name: name });
        }}
      >
        <FontAwesome6 name="plus" size={24} color="white" />
      </Pressable>

      {modalVisible && (
        <ImageModal
          image={storeImage}
          visible={modalVisible}
          close={() => setModalVisible(!modalVisible)}
        />
      )}
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ideaListView: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  ideaListMessageView: {
    borderWidth: 1,
    borderColor: "#a0a0a0",
    padding: 10,
  },
  ideaListMessage: {
    fontSize: 22,
    color: "#101010",
  },
  ideaListItem: {
    flexDirection: "row",
    alignItems: "top",
    gap: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#343434",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  ideaName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.2,
    color: "deepskyblue",
  },
  deleteButton: {
    marginVertical: 10,
    backgroundColor: "#d10000",
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  addIdeaButton: {
    position: "absolute",
    bottom: 30,
    right: "50%",
    transform: "translateX(25px)",
    borderRadius: 100,
    backgroundColor: "deepskyblue",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
});
