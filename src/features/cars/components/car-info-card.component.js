import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteCountForCar,
} from "../../../utils/database";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/authSlice";
import { useSQLiteContext } from "expo-sqlite";
import { showToast, TOAST_TYPE } from "../../../utils/notification";

const LeftContent = (props) => <Avatar.Icon {...props} icon="car" />;

const CarInfoCard = ({ car }) => {
  const { id, model, brand, description, imageUri, isFavorite } = car;

  const db = useSQLiteContext();
  const navigation = useNavigation();

  const user = useSelector(selectUser);

  const [isFavored, setIsFavored] = useState(isFavorite);
  const [favoredCount, setFavoredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateDetails = () => {
    navigation.navigate("Car Details", {
      carId: id,
    });
  };

  const handleAddFavorite = async () => {
    setIsFavored(true);
    setFavoredCount(favoredCount + 1);
    try {
      await createFavorite(db, id, user.id);
    } catch (error) {
      console.error("Error occurred add favorite");
      setIsFavored(false);
      setFavoredCount(favoredCount - 1);
      showToast(TOAST_TYPE.ERROR, "Error occurred add favorite");
    }
  };

  const handleRemoveFavorite = async () => {
    if (isLoading) return;

    setIsFavored(false);
    setFavoredCount(favoredCount - 1);
    try {
      await deleteFavorite(db, id, user.id);
    } catch (error) {
      console.error("Error occurred remove favorite");
      setIsFavored(true);
      setFavoredCount(favoredCount + 1);
      showToast(TOAST_TYPE.ERROR, error);
    }
  };

  const handleFetchFavoriteCount = async () => {
    setIsLoading(true);
    try {
      const { favoriteCount } = await getFavoriteCountForCar(db, id);
      setFavoredCount(favoriteCount);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchFavoriteCount();
  }, []);

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
            {!isLoading && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isFavored ? (
                  <IconButton
                    icon="heart"
                    iconColor={colors.ui.error}
                    size={20}
                    onPress={handleRemoveFavorite}
                  />
                ) : (
                  <IconButton
                    icon="heart-outline"
                    iconColor={colors.ui.error}
                    size={20}
                    onPress={handleAddFavorite}
                  />
                )}
                <Text style={{ marginLeft: 8 }}>{favoredCount}</Text>
              </View>
            )}
          </Card.Actions>
        </Card>
      </Spacer>
    </TouchableOpacity>
  );
};

export default CarInfoCard;
