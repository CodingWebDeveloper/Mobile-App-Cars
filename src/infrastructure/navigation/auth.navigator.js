import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../features/auth/screens/login.screen";
import RegisterScreen from "../../features/auth/screens/register.screen";

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
