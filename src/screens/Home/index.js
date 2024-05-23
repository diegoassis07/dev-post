import { useNavigation } from "@react-navigation/native";
import { useGlobal } from "../../contexts/auth";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "./../../config/firebaseConnetion";
import Feather from "@expo/vector-icons/Feather";
import PostsUser from "../PostsUser";
import * as Native from "react-native";
import * as S from "./styled";

export default function Home() {
  const navigation = useNavigation();
  const { user, loading, setLoading } = useGlobal();

  const [posts, setPosts] = useState([]);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState("");
  const [emptyList, setEmptyList] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const response = query(collection(db, "posts"), limit(5));
      try {
        const querySnapshot = await getDocs(response);
        const postsList = [];
        querySnapshot.forEach((doc) => {
          postsList.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setEmptyList(postsList.length === 0);
        setPosts(postsList);
        setLastItem(postsList[postsList.length - 1]); // ultimo item da lista
        setLoading(false);
      } catch (error) {
        console.log("error ao buscar posts: ", error);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  //Buscar mais posts quando puxar sua tela para cima
  async function handleRefreshPost() {
    setLoadingRefresh(true);
    const response = query(collection(db, "posts"), limit(6));
    try {
      const querySnapshot = await getDocs(response);
      const postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setEmptyList(postsList.length === 0);
      setPosts(postsList);
      setLastItem(postsList[postsList.length - 1]); // ultimo item da lista
      setLoading(false);
      setLoadingRefresh(false);
    } catch (error) {
      console.log("error ao buscar posts: ", error);
      setLoadingRefresh(false);
    }
  }

  // Buscar mais posts ao chegar no final da tela
  async function getListPost() {
    console.log("Iniciando getListPost");
    if (emptyList) {
      console.log("Lista vazia, nenhum post para carregar");
      setLoading(false);
      return null;
    }
    if (loading) {
      console.log("Carregamento em andamento, evitando chamadas duplicadas");
      return;
    }

    try {
      const queryConstraints = [orderBy("createdAt", "desc"), limit(5)];

      if (lastItem) {
        queryConstraints.push(startAfter(lastItem.createdAt));
      }

      const response = query(collection(db, "posts"), ...queryConstraints);
      const querySnapshot = await getDocs(response);

      const postsList = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        postsList.push({
          ...data,
          id, // Certifique-se de que cada documento tem um 'id'
        });
      });

      if (postsList.length === 0) {
        setEmptyList(true);
        console.log("Nenhum post encontrado na nova consulta");
      } else {
        setLastItem(postsList[postsList.length - 1]); // Atualize o último item
        setPosts((oldPosts) => {
          // Combine os posts existentes com os novos, garantindo que não haja duplicação de IDs
          const combinedPosts = [...oldPosts, ...postsList];
          const uniquePosts = Array.from(
            new Set(combinedPosts.map((post) => post.id))
          ).map((id) => combinedPosts.find((post) => post.id === id));
          return uniquePosts;
        });
        console.log("Posts carregados com sucesso");
      }

      setLoading(false); // Finaliza o estado de carregamento
    } catch (error) {
      console.log("Erro ao buscar posts: ", error);
      setLoading(false); // Finaliza o estado de carregamento mesmo em caso de erro
    }
  }

  return (
    <S.Container>
      <S.Title>
        Dev<Native.Text style={{ color: "#E52246" }}>Post</Native.Text>
      </S.Title>
      {loading ? (
        <Native.View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Native.ActivityIndicator size={24} color="#E52246" />
        </Native.View>
      ) : posts.length === 0 ? (
        <Native.View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Native.Text style={{ fontSize: 16 }}>
            Nenhum post disponível
          </Native.Text>
        </Native.View>
      ) : (
        <Native.FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id.toString()} // Certifique-se de que 'id' é único e convertido para string
          renderItem={({ item }) => <PostsUser data={item} />}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPost}
          onEndReached={getListPost}
          onEndReachedThreshold={0.5} // Ajuste este valor conforme necessário
        />
      )}
      <S.ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Feather name="edit-2" size={25} color="#FFF" />
      </S.ButtonPost>
    </S.Container>
  );
}
