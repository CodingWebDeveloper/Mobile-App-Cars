import { CarsScreen } from "../../features/cars/screens/cars.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateCarScreen from "../../features/cars/screens/create-car.screen";
import UpdateCarScreen from "../../features/cars/screens/update-car.screen";
import CarDetailsScreen from "../../features/cars/screens/car-details.screen";
import { Button, IconButton, MD3Colors } from "react-native-paper";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/authSlice";
import { auth } from "../../firebase/config";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Cars"
        component={CarsScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="logout"
              iconColor={MD3Colors.error50}
              size={25}
              onPress={handleSignOut}
            />
          ),
        }}
      />
      <Stack.Screen name="Car Details" component={CarDetailsScreen} />
      <Stack.Screen name="Create Car" component={CreateCarScreen} />
      <Stack.Screen name="Update Car" component={UpdateCarScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
