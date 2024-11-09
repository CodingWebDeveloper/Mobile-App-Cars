import React from "react";
import { useTheme } from "styled-components/native";
import {
  CameraButton,
  PhotoSection,
  StyledTextInput,
} from "./create-car.styles";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const CarFormComponent = ({ setCarInput, carInput }) => {
  const theme = useTheme();

  const handleChangeModel = (text) => {
    setCarInput({
      ...carInput,
      model: text,
    });
  };

  const handleChangeBrand = (text) => {
    setCarInput({
      ...carInput,
      brand: text,
    });
  };

  const handleChangeDescription = (text) => {
    setCarInput({
      ...carInput,
      description: text,
    });
  };

  const handleAddPhoto = async () => {
    // Request permission to access camera roll
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to enable permissions to access photos."
      );
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    const image = result.assets[0];
    if (!result.canceled) {
      setCarInput({ ...carInput, imageUri: image.uri, file: image }); // Set the selected image URI to state
    }
  };

  return (
    <>
      <StyledTextInput
        label="Brand"
        value={carInput.brand}
        onChangeText={handleChangeBrand}
        mode="outlined"
      />

      <StyledTextInput
        label="Model"
        value={carInput.model}
        onChangeText={handleChangeModel}
        mode="outlined"
      />

      <StyledTextInput
        label="Description"
        value={carInput.description}
        onChangeText={handleChangeDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
      />

      <PhotoSection>
        {carInput.imageUri ? (
          <Avatar.Image size={80} source={{ uri: carInput.imageUri }} />
        ) : (
          <Avatar.Icon
            size={80}
            icon="car"
            style={{ backgroundColor: theme.colors.brand.primary }}
          />
        )}
        <CameraButton icon="camera" size={30} onPress={handleAddPhoto} />
      </PhotoSection>
    </>
  );
};

export default CarFormComponent;
