import { Provider } from "react-redux";
import { Text } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "./src/utils/database";
import Navigation from "./src/infrastructure/navigation";
import { store } from "./src/app";
import { Suspense, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import Toast from "react-native-toast-message";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function App() {
  return (
    <Suspense
      fallback={
        <ActivityIndicator
          animating={true}
          size="large"
          color={MD2Colors.blue400}
        />
      }
    >
      <SQLiteProvider databaseName="rentCars.db" onInit={migrateDbIfNeeded}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Navigation />
          </Provider>
          <Toast position="bottom" bottomOffset={20} />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
