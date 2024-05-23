import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./../config/firebaseConnetion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  //function para abrir o files do android
  const handleFiles = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    /* handleUrlProfile(result); */
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleStorage();
    }
  };

  // Função para fazer o upload da imagem
  const handleStorage = async () => {
    const storage = getStorage();
    const response = await fetch(image);
    const blob = await response.blob();
    const imageRef = ref(storage, "Imagem/avatar");

    try {
      const uploadTask = await uploadBytes(imageRef, blob);
      const downloadImageURL = await getDownloadURL(imageRef, blob);
      setDownloadURL(downloadImageURL);
      console.log(uploadTask);
      console.log(downloadImageURL);
    } catch (error) {
      console.log("Erro no upload de imagem", error);
      return "";
    }
  };

  //salvando crendentiais do usuario no asyncStorage
  const storageUser = async (data) => {
    const response = await AsyncStorage.setItem(
      "hasUser",
      JSON.stringify(data)
    );
    return response;
  };

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("hasUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  // cadastrar usuario no authFirebase
  const RegisterUser = async (name, email, password) => {
    setLoadingAuth(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let id = response.user.uid;
      const docRef = await addDoc(collection(db, "users"), {
        id: id,
        nome: name,
        createdAt: new Date(),
      });
      let data = {
        uid: id,
        nome: name,
        email: response.user.email,
      };
      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      return docRef;
    } catch (error) {
      console.log("error ao seta usuario no firebaseAuth", error);
      handleErrors(error);
      setLoadingAuth(false);
    }
  };

  //function para tratar erros do auth firebase
  const handleErrors = (error) => {
    if (error.message.toString().includes("auth/invalid-email"))
      alert("E-mail invalido");

    if (error.message.toString().includes("auth/quota-exceeded"))
      alert(
        "Cota excedida para verificação de senhas. Por favor tente mas tarde !!"
      );

    if (error.message.toString().includes("auth/invalid-credential"))
      alert("Credentiais invalidas !");

    if (error.message.toString().includes("auth/too-many-requests"))
      alert(
        "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde."
      );
  };

  //function de login
  const Login = async (email, password) => {
    setLoadingAuth(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      let uid = response.user.uid;
      const userFirestore = query(collection(db, "users"));
      const querySnapshot = await getDocs(userFirestore);
      querySnapshot.docs.forEach((doc) => {
        if (doc?.data()?.id == uid) {
          let data = {
            uid: uid,
            nome: doc.data().nome,
            email: response.user.email,
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
        }
      });
    } catch (error) {
      console.log(error);
      handleErrors(error);
      setLoadingAuth(false);
    }
  };

  //function para deslogar usuario do app
  const LogOut = async () => {
    const response = await AsyncStorage.setItem("hasUser", "");
    setUser("");
  };

  return (
    <AuthContext.Provider
      value={{
        hasUser: !!user,
        user,
        setUser,
        RegisterUser,
        Login,
        LogOut,
        loadingAuth,
        loading,
        setLoading,
        handleFiles,
        image,
        downloadURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobal = () => {
  const Context = useContext(AuthContext);
  return Context;
};
