import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components/native";
import {
  ActivityIndicator,
  Divider,
  MD2Colors,
  Text,
} from "react-native-paper";
import {
  ButtonContainer,
  CarCard,
  CarImage,
  CarInfo,
  CarTitle,
  Container,
  DescriptionText,
  PlaceholderImage,
  StyledButton,
} from "../components/car-details.styles";
import { deleteCar, getCarById } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";
import { showToast, TOAST_TYPE } from "../../../utils/notification";
import { useFocusEffect } from "@react-navigation/native";

const CarDetailsScreen = ({ route, navigation }) => {
  const db = useSQLiteContext();
  const theme = useTheme();

  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Assuming `route.params` contains the car details
  const { carId } = route.params;

  const handleEdit = () => {
    // Navigate to an Edit Screen, passing the car's data
    navigation.navigate("Update Car", { carId });
  };

  const handleDelete = () => {
    // Show confirmation alert before deleting
    Alert.alert("Delete Car", "Are you sure you want to delete this car?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteCar(db, carId);
          navigation.navigate("Cars");
        },
      },
    ]);
  };

  const fetchCar = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCarById(db, carId);
      setCarData(data);
    } catch (error) {
      showToast(TOAST_TYPE.ERROR, "Error occurred");
    }

    setIsLoading(false);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchCar();
    }, [fetchCar])
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        color={MD2Colors.blue400}
      />
    );
  }

  const { imageUri, brand, model, description } = carData ?? {};

  return (
    <Container>
      <CarCard>
        {imageUri ? (
          <CarImage source={{ uri: imageUri }} resizeMode="cover" />
        ) : (
          <PlaceholderImage />
        )}

        <CarInfo>
          <CarTitle variant="headlineLarge">
            {brand} - {model}
          </CarTitle>
          <Divider />
          <DescriptionText variant="bodyMedium">{description}</DescriptionText>
        </CarInfo>
      </CarCard>

      <ButtonContainer>
        <StyledButton
          mode="contained"
          onPress={handleEdit}
          buttonColor={theme.colors.brand.primary}
        >
          Edit
        </StyledButton>

        <StyledButton
          mode="contained"
          onPress={handleDelete}
          buttonColor={theme.colors.ui.error}
        >
          Delete
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default CarDetailsScreen;
