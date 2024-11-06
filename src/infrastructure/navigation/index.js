import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app.navigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
