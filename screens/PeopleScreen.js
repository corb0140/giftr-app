import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ModalComponent from "../components/Modal";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useState } from "react";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { deletePerson } = useContext(PeopleContext);
  const [modalVisible, setModalVisible] = useState(false);

  const renderRightActions = (id) => (
    <Pressable
      style={styles.deleteButton}
      onPress={() => {
        deletePerson(id);
      }}
    >
      <FontAwesome6 name="trash" size={24} color="white" />
    </Pressable>
  );

  const renderItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.dob}</Text>
          </View>

          <MaterialIcons
            name="lightbulb"
            size={35}
            color="black"
            onPress={() =>
              navigation.navigate("Idea", {
                id: item.id,
                name: item.name,
              })
            }
          />
        </View>
      </Swipeable>
    );
  };

  const { people } = useContext(PeopleContext);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView>
          {people.length === 0 ? (
            <View>
              <Text>No People Added</Text>
            </View>
          ) : (
            <FlatList
              data={people.sort((a, b) => a.dob.localeCompare(b.dob))}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          )}

          <Pressable
            style={styles.addPersonButton}
            title="Add Person"
            onPress={() => navigation.navigate("AddPerson")}
          >
            <FontAwesome6 name="plus" size={24} color="white" />
          </Pressable>

          {people.length === 0 && (
            <ModalComponent
              text="Please add a person"
              visible={!modalVisible}
              close={() => {
                setModalVisible(!modalVisible);
              }}
            />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#343434",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  itemInfo: {
    flexDirection: "column",
    gap: 8,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "deepskyblue",
  },
  itemDate: {
    fontSize: 18,
    color: "#1a1a1a",
    opacity: 0.5,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d10000",
    width: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 5,
  },
  addPersonButton: {
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
