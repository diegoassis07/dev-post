import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useGlobal } from "../../contexts/auth";
import * as Native from "react-native";
import * as S from "./style";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { RegisterUser, loadingAuth } = useGlobal();

  const handleSignUp = async () => {
    if (name === "" || email === "" || password === "")
      alert("Preencha todos campos");
    await RegisterUser(name, email, password);
  };
  const toggleLogin = () => {
    navigation.navigate("SignIn");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <S.Container behavior={Native.Platform.OS === "ios" ? "padding" : "height"}>
      <S.Title>
        Dev<Native.Text style={{ color: "#E52246" }}>Post</Native.Text>
      </S.Title>
      <S.Input
        placeholder="Seu nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <S.Input
        placeholder="email@email.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <S.Input
        placeholder="********"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <S.Button onPress={handleSignUp}>
        {loadingAuth ? (
          <Native.ActivityIndicator size={28} color="#fff" />
        ) : (
          <S.ButtonText>Cadastrar</S.ButtonText>
        )}
      </S.Button>

      <S.SignInText>
        <S.Link onPress={toggleLogin}>Já possuo uma conta</S.Link>
      </S.SignInText>
    </S.Container>
  );
}
