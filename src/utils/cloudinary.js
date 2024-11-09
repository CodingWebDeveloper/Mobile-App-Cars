import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import * as FileSystem from "expo-file-system";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
});

export const options = {
  upload_preset: process.env.CLOUDINARY_PRESET_NAME,
  unsigned: true,
};

export const uploadImage = async (filePath, mimeType, handleSetImageUri) => {
  const base64Image = await FileSystem.readAsStringAsync(filePath, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const base64Data = `data:${mimeType};base64,${base64Image}`;
  await upload(cloudinary, {
    file: base64Data,
    options,
    callback: (error, response) => {
      handleSetImageUri(response.secure_url);
    },
  });
};
