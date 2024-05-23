import { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { useGlobal } from "./../../contexts/auth";
import { db } from "./../../config/firebaseConnetion";
import * as S from "./style";

export default function NewPost() {
  const navigation = useNavigation();
  const { user, downloadURL } = useGlobal();
  const [post, setPost] = useState("");

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <S.Button onPress={handlePost}>
          <S.ButtonText>Compartilhar</S.ButtonText>
        </S.Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === "") console.log("Seu post contem conteudo invalido");
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        createdAt: new Date(),
        description: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
        avatarUrl: downloadURL,
      });
      setPost("");
      navigation.navigate("Home");
      return docRef;
    } catch (error) {
      avatarUrl = null;
      console.log(error);
    }
  }

  return (
    <S.Container>
      <S.Input
        placeholder="O que está acontecendo?"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#DDD"
        maxLength={300}
      />
    </S.Container>
  );
}
