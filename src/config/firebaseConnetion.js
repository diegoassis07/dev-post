import { initializeApp } from 'firebase/app';
import { getReactNativePersistence,initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATIVo8pTGbbWjczWYxvHqPurjh0pQocBU",
  authDomain: "devpost-decc1.firebaseapp.com",
  databaseURL: "https://devpost-decc1-default-rtdb.firebaseio.com",
  projectId: "devpost-decc1",
  storageBucket: "devpost-decc1.appspot.com",
  messagingSenderId: "1045608368319",
  appId: "1:1045608368319:web:53ee730d537f193d995e0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication 
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
export { auth, db};