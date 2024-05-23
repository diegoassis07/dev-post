import { useState } from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Native from "react-native";
import * as S from "./style";

export default function PostsUser({ data }) {
  const [likers, setLikers] = useState(data?.likes);
  
  function formatTimePost() {
    const datePost = new Date(data.createdAt.seconds * 1000);
    // transformando hora em ptBr
    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <S.Container>
      <S.Header>
        {data.avatarUrl ? (
          <S.Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <S.Avatar source={require("./../../assets/avatar.png")} />
        )}
        <S.Nome numberOfiLines={1}>{data.autor}</S.Nome>
      </S.Header>

      <S.ContentContainer>
        <S.Content>{data.description}</S.Content>
      </S.ContentContainer>

      <S.Actions>
        <S.LikerButton>
          <S.Like>{likers === 0 ? "" : likers}</S.Like>
          <MaterialCommunityIcons
            name={likers === 0 ? "heart-plus-outline" : "cards-heart"}
            size={20}
            color="#e52246"
          />
        </S.LikerButton>

        <S.TimePost>{formatTimePost()}</S.TimePost>
      </S.Actions>
    </S.Container>
  );
}
