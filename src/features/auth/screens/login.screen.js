import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthButton, Container, Input, Title } from "../components/auth.styles";
import { loginRequest } from "../../../services/authentication/authentication.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../../app/slices/authSlice";
import { auth } from "../../../firebase/config";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const isValid = email && password;
    if (!isValid) {
      setError("All fields are required.");
      return;
    }

    try {
      const user = await loginRequest(auth, email, password);
      dispatch(setUser(user));

      setError("");
    } catch (e) {
      setError(e.toString());
    }
    setError("");
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
        </AuthButton>
      </Container>
      <Button mode="text" onPress={handleNavigateRegister}>
        New? Create account
      </Button>
    </SafeArea>
  );
};

export default LoginScreen;
