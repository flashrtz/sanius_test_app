import React, { useState } from "react";
import MovieScreen from "./app/screens/MovieScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FavoriteScreen from "./app/screens/FavoriteScreen";

const Stack = createNativeStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="MovieScreen" component={MovieScreen} />
    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
