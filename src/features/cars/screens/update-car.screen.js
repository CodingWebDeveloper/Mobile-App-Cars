import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Container } from "../../../components/utility/container.component";
import CarFormComponent from "../components/car-form.component";
import { useTheme } from "styled-components/native";
import { SubmitButton, Title } from "../components/create-car.styles";
import { getCarById, updateCar } from "../../../utils/database";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { showToast, TOAST_TYPE } from "../../../utils/notification";
import { useFocusEffect } from "@react-navigation/native";
import { uploadImage } from "../../../utils/cloudinary";
import { validateForm } from "../../../utils/car-form-validation";

const DEFAULT_CAR_INPUT = {
  model: "",
  brand: "",
  description: "",
  imageUri: null,
  file: null,
};

const UpdateCarScreen = ({ route, navigation }) => {
  const db = useSQLiteContext();
  const theme = useTheme();

  const { carId } = route.params;
  const [carInput, setCarInput] = useState(DEFAULT_CAR_INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const newErrors = validateForm(carInput);
      setErrors(newErrors);

      const isInvalid = Object.values(newErrors).some((e) => Boolean(e));
      if (isInvalid) return;

      let imageUri = carInput.imageUri;
      if (carInput.file) {
        await uploadImage(
          carInput.imageUri,
          carInput.file.mimeType,
          (uri) => (imageUri = uri)
        );
      }

      await updateCar(db, carId, { ...carInput, imageUri });
      showToast(TOAST_TYPE.SUCCESS, "Successfully updated a car");
      navigation.navigate("Car Details", { carId });
    } catch (error) {
      console.error(error);
      showToast(TOAST_TYPE.ERROR, "Error updating a car");
    }
  };

  const fetchCar = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCarById(db, carId);
      setCarInput(data);
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

  return (
    <SafeArea>
      <Container>
        <Title variant="titleLarge">Update Car</Title>

        <CarFormComponent
          setCarInput={setCarInput}
          carInput={carInput}
          errors={errors}
          setErrors={setErrors}
        />

        <SubmitButton
          mode="contained"
          onPress={handleSubmit}
          buttonColor={theme.colors.brand.primary}
          textColor={theme.colors.text.inverse}
        >
          Update Car
        </SubmitButton>
      </Container>
    </SafeArea>
  );
};

export default UpdateCarScreen;
