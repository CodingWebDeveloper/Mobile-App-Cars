import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CarInfoCard from "./car-info-card.component";
import { getAllCars } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";
import { AnimatedFAB, Text } from "react-native-paper";
import { Container } from "../../../components/utility/container.component";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const CarList = () => {
  const db = useSQLiteContext();
  const navigation = useNavigation();

  const [carsData, setCarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtended, setIsExtended] = useState(true);

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

  return (
    <Container>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          onScroll={onScroll}
          data={carsData}
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
