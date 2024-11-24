import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthButton, Container, Input, Title } from "../components/auth.styles";
import { loginRequest } from "../../../services/authentication/authentication.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../../app/slices/authSlice";
import { auth } from "../../../firebase/config";
import { getUserByEmail } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";

const LoginScreen = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const isValid = email && password;
    if (!isValid) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      await loginRequest(auth, email, password);
      const dbUser = await getUserByEmail(db, email);
      dispatch(setUser(dbUser));

      setError("");
    } catch (e) {
      setError(e.toString());
    }

    setIsLoading(false);
  };

  const handleNavigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeArea>
      <Container>
        <Title>Log In</Title>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
        />
        <AuthButton mode="contained" onPress={handleLogin}>
          Login
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{
                alignSelf: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            />
          )}
        </AuthButton>
      </Container>
      <Button mode="text" onPress={handleNavigateRegister}>
        New? Create account
      </Button>
    </SafeArea>
  );
};

export default LoginScreen;
