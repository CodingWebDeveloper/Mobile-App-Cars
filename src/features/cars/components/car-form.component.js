import React from "react";
import { useTheme } from "styled-components/native";
import { CameraButton, PhotoSection } from "./create-car.styles";
import { Avatar, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";

const CarFormComponent = ({ setCarInput, carInput, errors, setErrors }) => {
  const theme = useTheme();

  const handleChangeModel = (text) => {
    setCarInput({
      ...carInput,
      model: text,
    });
    setErrors({ ...errors, model: "" });
  };

  const handleChangeBrand = (text) => {
    setCarInput({
      ...carInput,
      brand: text,
    });

    setErrors({ ...errors, brand: "" });
  };

  const handleChangeDescription = (text) => {
    setCarInput({
      ...carInput,
      description: text,
    });

    setErrors({ ...errors, description: "" });
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
      <TextInput
        label="Brand"
        value={carInput.brand}
        onChangeText={handleChangeBrand}
        mode="outlined"
      />

      {errors.brand && (
        <Text style={{ color: colors.text.error }}>{errors.brand}</Text>
      )}
      <Spacer size="small" position="bottom" />

      <TextInput
        label="Model"
        value={carInput.model}
        onChangeText={handleChangeModel}
        mode="outlined"
      />
      {errors.model && (
        <Text style={{ color: colors.text.error }}>{errors.model}</Text>
      )}
      <Spacer size="small" position="bottom" />

      <TextInput
        label="Description"
        value={carInput.description}
        onChangeText={handleChangeDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
      />
      {errors.description && (
        <Text style={{ color: colors.text.error }}>{errors.description}</Text>
      )}

      <Spacer size="small" position="bottom" />

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
