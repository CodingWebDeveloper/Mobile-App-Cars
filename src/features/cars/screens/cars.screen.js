import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import Search from "../components/search.component";
import CarList from "../components/car-list.component";
import { View } from "react-native";

export const CarsScreen = () => {
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <Search />
        <CarList />
      </View>
    </SafeArea>
  );
};
