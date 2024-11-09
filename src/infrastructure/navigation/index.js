import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app.navigator";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/authSlice";
import { AuthNavigator } from "./auth.navigator";

const Navigation = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
