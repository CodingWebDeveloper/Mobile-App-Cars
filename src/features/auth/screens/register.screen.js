import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { AuthButton, Container, Input, Title } from "../components/auth.styles";
import { setUser } from "../../../app/slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { createUser } from "../../../utils/database";
import { useSQLiteContext } from "expo-sqlite";

const RegisterScreen = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {
    const isValid = name && email && password && repeatedPassword;
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
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      const userInput = { email, name };
      const dbUser = await createUser(db, userInput);
      dispatch(setUser(dbUser));

      setError("");
    } catch (e) {
      setError(e.toString());
    }
    setIsLoading(false);
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
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
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
      <Button mode="text" onPress={handleNavigateLogin}>
        Already have account? Log In
      </Button>
    </SafeArea>
  );
};

export default RegisterScreen;
