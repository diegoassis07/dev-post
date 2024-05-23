import { useGlobal } from "./../../contexts/auth";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as Native from "react-native";
import * as S from "./style";

export default function Profile() {
  const { handleFiles, LogOut, downloadURL } = useGlobal();

  return (
    <S.Container>
      <S.Title>
        Dev<Native.Text style={{ color: "#E52246" }}>Post</Native.Text>
      </S.Title>

      <Native.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          bottom: 50,
        }}
      >
        <S.ButtonProfile onPress={() => handleFiles()}>
          {downloadURL ? (
            <S.UploadImagem source={{ uri: downloadURL }} />
          ) : (
            <S.ImageProfile source={require("./../../assets/avatar.png")} />
          )}

          <S.ButtonText>
            <AntDesign name="plus" size={35} color="#7A7A7A" />
          </S.ButtonText>
        </S.ButtonProfile>
        <S.Nome>Lucas Oliveira</S.Nome>
        <S.Email>teste@teste.com</S.Email>

        <S.UploadProfile>
          <S.UploadText>Atualizar perfil</S.UploadText>
        </S.UploadProfile>

        <S.LogOut onPress={() => LogOut()}>
          <S.LogOutText>Sair</S.LogOutText>
        </S.LogOut>
      </Native.View>
    </S.Container>
  );
}
