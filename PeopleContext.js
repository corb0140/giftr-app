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

  return (
    <PeopleContext.Provider value={{ people, addPerson, deletePerson }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
