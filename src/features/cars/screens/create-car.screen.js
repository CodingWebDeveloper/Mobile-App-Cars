import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Container } from "../../../components/utility/container.component";
import { SubmitButton, Title } from "../components/create-car.styles";
import CarFormComponent from "../components/car-form.component";
import { createCar } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";
import { showToast, TOAST_TYPE } from "../../../utils/notification";

const DEFAULT_CAR_INPUT = {
  model: "",
  brand: "",
  description: "",
  imageUri: null,
};

const CreateCarScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const theme = useTheme();
  const [carInput, setCarInput] = useState(DEFAULT_CAR_INPUT);

  const handleSubmit = async () => {
    try {
      await createCar(db, carInput);
      showToast(TOAST_TYPE.SUCCESS, "Successfully created a car");
      navigation.navigate("Cars");
    } catch (error) {
      showToast(TOAST_TYPE.ERROR, "Error creating a car");
    }
  };

  return (
    <SafeArea>
      <Container>
        <Title variant="titleLarge">Create New Car</Title>
        <CarFormComponent setCarInput={setCarInput} carInput={carInput} />
        <SubmitButton
          mode="contained"
          onPress={handleSubmit}
          buttonColor={theme.colors.brand.primary}
          textColor={theme.colors.text.inverse}
        >
          Add Car
        </SubmitButton>
      </Container>
    </SafeArea>
  );
};

export default CreateCarScreen;
