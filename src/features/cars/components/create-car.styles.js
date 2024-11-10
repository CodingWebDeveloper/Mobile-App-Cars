import { ScrollView, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: { padding: 20 },
})`
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Title = styled(Text)`
  margin-bottom: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.ui.primary};
`;

export const PhotoSection = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const CameraButton = styled(IconButton)`
  margin-left: 10px;
`;

export const SubmitButton = styled(Button).attrs((props) => ({
  mode: "contained",
  buttonColor: colors.brand.primary,
  textColor: colors.text.inverse,
}))`
  margin-top: 20px;
`;
