import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const STORAGE_KEY = "people";

  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPeople) setPeople(JSON.parse(savedPeople));
    };
    loadPeople();
    console.log(people);
  }, []);

  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    const updatedPeople = [...people, newPerson];
    console.log(updatedPeople);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const deletePerson = async (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const addPersonIdeas = async ({ id, idea }) => {
    const imageSize = {
      width: idea.imageWidth,
      height: idea.imageHeight,
    };

    console.log(imageSize);
    const updatedPeople = people.find((person) => person.id === id);

    updatedPeople.ideas.push(idea);
    setPeople([...people]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    await AsyncStorage.setItem("width", JSON.stringify(imageSize.width));
    await AsyncStorage.setItem("height", JSON.stringify(imageSize.height));
  };

  const deletePersonIdea = async ({ id, ideaId }) => {
    const updatedPeople = people.find((person) => person.id === id);
    updatedPeople.ideas = updatedPeople.ideas.filter(
      (idea) => idea.id !== ideaId
    );
    setPeople([...people]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        addPerson,
        deletePerson,
        addPersonIdeas,
        deletePersonIdea,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
