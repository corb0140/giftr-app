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

export default function PeopleScreen() {
  const navigation = useNavigation();

  const renderRightActions = (id) => (
    <Pressable
      style={styles.deleteButton}
      onPress={() => {
        dispatch(deletePerson(id));
      }}
    >
      <FontAwesome6 name="trash" size={30} color="white" />
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
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Pressable
            style={styles.addPersonButton}
            title="Add Person"
            onPress={() => navigation.navigate("AddPerson")}
          >
            <Text style={{ color: "white" }}>Add Person</Text>
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
  peopleListView: {
    marginVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  peopleListMessageView: {
    borderBottomWidth: 2,
    borderBottomColor: "#f0f0f0",
  },
  peopleListMessage: {
    fontSize: 22,
    color: "#a0a0a0",
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBlockColor: "#d0d0d0",
    padding: 10,
  },
  itemInfo: {
    flexDirection: "column",
    gap: 8,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
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
  },
  addPersonButton: {
    backgroundColor: "deepskyblue",
    padding: 15,
    alignItems: "center",
    margin: 10,
  },
});
