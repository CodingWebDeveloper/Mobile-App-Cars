import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Container } from "../../../components/utility/container.component";
import { SubmitButton, Title } from "../components/create-car.styles";
import CarFormComponent from "../components/car-form.component";
import { createCar } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";
import { showToast, TOAST_TYPE } from "../../../utils/notification";
import { uploadImage } from "../../../utils/cloudinary";
import { validateForm } from "../../../utils/car-form-validation";

const DEFAULT_CAR_INPUT = {
  model: "",
  brand: "",
  description: "",
  imageUri: null,
  file: null,
};

const CreateCarScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const theme = useTheme();
  const [carInput, setCarInput] = useState(DEFAULT_CAR_INPUT);
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

      let imageUri = "";
      if (carInput.file) {
        await uploadImage(
          carInput.imageUri,
          carInput.file.mimeType,
          (uri) => (imageUri = uri)
        );
      }

      await createCar(db, { ...carInput, imageUri });

      showToast(TOAST_TYPE.SUCCESS, "Successfully created a car");
      navigation.navigate("Cars");
    } catch (error) {
      console.log(error);
      showToast(TOAST_TYPE.ERROR, "Error creating a car");
    }
  };

  return (
    <SafeArea>
      <Container>
        <Title variant="titleLarge">Create New Car</Title>
        <CarFormComponent
          setCarInput={setCarInput}
          carInput={carInput}
          setErrors={setErrors}
          errors={errors}
        />
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
