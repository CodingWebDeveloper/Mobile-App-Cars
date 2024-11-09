import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Button, Text } from "react-native-paper";
import { AuthButton, Container, Input, Title } from "../components/auth.styles";
import { loginRequest } from "../../../services/authentication/authentication.service";
import { setUser } from "../../../app/slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async () => {
    const isValid = email && password && repeatedPassword;
    if (!isValid) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== repeatedPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(user));

      setError("");
    } catch (e) {
      setError(e.toString());
    }
  };

  const handleNavigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeArea>
      <Container>
        <Title>Register</Title>
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

        <Input
          label="Repeat Password"
          value={repeatedPassword}
          onChangeText={setRepeatedPassword}
          mode="outlined"
          secureTextEntry
        />

        <AuthButton mode="contained" onPress={handleRegister}>
          Register
        </AuthButton>
      </Container>
      <Button mode="text" onPress={handleNavigateLogin}>
        Already have account? Log In
      </Button>
    </SafeArea>
  );
};

export default RegisterScreen;
