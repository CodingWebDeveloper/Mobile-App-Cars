import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Input = styled(TextInput)`
  width: 100%;
  margin-bottom: 16px;
`;

export const AuthButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 24px;
  margin-bottom: 24px;
`;
