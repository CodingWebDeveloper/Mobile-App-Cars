import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";

const LeftContent = (props) => <Avatar.Icon {...props} icon="car" />;

const CarInfoCard = ({ car }) => {
  const navigation = useNavigation();
  const { id, model, brand, description, imageUri } = car;

  const handleNavigateDetails = () => {
    navigation.navigate("Car Details", {
      carId: id,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigateDetails}>
      <Spacer position="bottom" size="small">
        <Card>
          <Card.Title title={brand} subtitle={model} left={LeftContent} />
          <Card.Content>
            <Text
              numberOfLines={1}
              style={{ width: "100%" }}
              variant="bodyMedium"
            >
              {description}
            </Text>
          </Card.Content>
          {imageUri ? (
            <Card.Cover source={{ uri: imageUri }} />
          ) : (
            <View
              style={{
                height: 150,
                width: "100%",
                backgroundColor: colors.ui.secondary,
              }}
            ></View>
          )}
          <Card.Actions>
            {/* <Button>Cancel</Button>
        <Button>Ok</Button> */}
          </Card.Actions>
        </Card>
      </Spacer>
    </TouchableOpacity>
  );
};

export default CarInfoCard;
