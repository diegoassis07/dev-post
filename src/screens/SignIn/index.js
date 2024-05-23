import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useGlobal } from "../../contexts/auth";
import * as Native from "react-native";
import * as S from "./styled";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login, loadingAuth } = useGlobal();

  const handleSignIn = async () => {
    if (email === "" || password === "") alert("Preencha todos campos");
    await Login(email, password);
    setEmail("");
    setPassword("");
  };

  const toggleLogin = () => {
    navigation.navigate("SignUp");
    setEmail("");
    setPassword("");
  };

  return (
    <S.Container>
      <S.Title>
        Dev<Native.Text style={{ color: "#E52246" }}>Post</Native.Text>
      </S.Title>

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

      <S.Button onPress={handleSignIn}>
        {loadingAuth ? (
          <Native.ActivityIndicator size={28} color="#fff" />
        ) : (
          <S.ButtonText>Acessar</S.ButtonText>
        )}
      </S.Button>

      <S.SignUpText>
        <S.Link onPress={toggleLogin}>Criar uma conta</S.Link>
      </S.SignUpText>
    </S.Container>
  );
}
