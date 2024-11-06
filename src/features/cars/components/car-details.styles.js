import { Image, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { styled } from "styled-components/native";

// Container for the whole screen
export const Container = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

// Card for displaying car information
export const CarCard = styled(Card)`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

// Image styling for the car photo
export const CarImage = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

// Placeholder styling if no photo is available
export const PlaceholderImage = styled(View)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.colors.ui.disabled};
  justify-content: center;
  align-items: center;
`;

// Car name text styling
export const CarTitle = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 4px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CarInfo = styled(View)`
  padding: 16px 0;
`;

// Car brand and model text styling
export const BrandModelText = styled(Text)`
  font-size: 18px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// Car description text styling
export const DescriptionText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

// Container for action buttons
export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
`;

// Style for the Edit and Delete buttons
export const StyledButton = styled(Button)`
  flex: 1;
  margin: 0 8px;
`;
