import Toast from "react-native-toast-message";

export const showToast = (type, message) => {
  Toast.show({
    type,
    text1: message,
  });
};

export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};
