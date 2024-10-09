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
import ImageModal from "../components/ImageModal";

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
              <View style={styles.ideaListMessageView}>
                <Text style={styles.ideaListMessage}>{item.idea}</Text>
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

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    deletePersonIdeaHandler(item.id);
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
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
        <Text>Add Idea</Text>
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
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
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
  fab: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 0,
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
  },
});
