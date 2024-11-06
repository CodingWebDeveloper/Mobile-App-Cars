import { CarsScreen } from "../../features/cars/screens/cars.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateCarScreen from "../../features/cars/screens/create-car.screen";
import UpdateCarScreen from "../../features/cars/screens/update-car.screen";
import CarDetailsScreen from "../../features/cars/screens/car-details.screen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Cars" component={CarsScreen} />
      <Stack.Screen name="Car Details" component={CarDetailsScreen} />
      <Stack.Screen name="Create Car" component={CreateCarScreen} />
      <Stack.Screen name="Update Car" component={UpdateCarScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
