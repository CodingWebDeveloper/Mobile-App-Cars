import { View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import styled from "styled-components";

export const CarListContainer = styled(View)`
  flex: 1;
  padding: 16px;
`;

export const AddCarFab = styled(AnimatedFAB)`
  bottom: 16px;
  right: 16px;
  position: absolute;
  animate-from: 16px;
`;
