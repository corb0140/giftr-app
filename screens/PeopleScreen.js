import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen() {
  const navigation = useNavigation();
  //   const people = [
  //     {
  //       id: "d825796c-4fc1-4879-ad86-048ece613581",
  //       name: "Tom",
  //       dob: "2001-01-09",
  //     },
  //     {
  //       id: "b825796d-4fc1-4879-ad86-048ece613582",
  //       name: "Megan",
  //       dob: "2001-02-28",
  //     },
  //     {
  //       id: "a825796e-4fc1-4879-ad86-048ece613583",
  //       name: "Conor",
  //       dob: "2001-04-28",
  //     },
  //   ];

  const { people } = useContext(PeopleContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={people}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.dob}</Text>
            </View>
          )}
        />
        <Button
          title="Add Person"
          onPress={() => navigation.navigate("AddPerson")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
