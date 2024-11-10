import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CarInfoCard from "./car-info-card.component";
import { getAllCars } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";
import {
  ActivityIndicator,
  AnimatedFAB,
  MD2Colors,
  Text,
} from "react-native-paper";
import { Container } from "../../../components/utility/container.component";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../../app/slices/searchSlice";

const CarList = () => {
  const db = useSQLiteContext();
  const navigation = useNavigation();

  const [carsData, setCarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtended, setIsExtended] = useState(true);

  const searchTerm = useSelector(selectSearchTerm);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleNavigateCreate = () => {
    navigation.navigate("Create Car");
  };

  const fetchAllCars = useCallback(async () => {
    setIsLoading(true);
    const data = await getAllCars(db);
    setCarsData(data);
    setIsLoading(false);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchAllCars();
    }, [fetchAllCars])
  );

  const filteredCars =
    carsData?.filter((car) => {
      const brandLowerCase = car.brand.toLowerCase();
      const modelLowerCase = car.model.toLowerCase();
      const searchTermLowerCase = searchTerm.toLowerCase();

      const isMatch =
        brandLowerCase.includes(searchTermLowerCase) ||
        modelLowerCase.includes(searchTermLowerCase);

      return isMatch;
    }) ?? [];

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={MD2Colors.blue400}
        />
      ) : (
        <FlatList
          onScroll={onScroll}
          data={filteredCars}
          renderItem={({ item }) => <CarInfoCard car={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <AnimatedFAB
        icon={"plus"}
        label={"New Car"}
        extended={isExtended}
        onPress={handleNavigateCreate}
        visible={true}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={[styles.fabStyle]}
      />
    </Container>
  );
};

export default CarList;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
