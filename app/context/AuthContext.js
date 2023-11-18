import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./UseAuth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [listOfExperience, setListOfExperience] = useState([]);
  const [listOfFavPosts, setListOfFavPosts] = useState([]);
  const { user, googleSignIn, logOut } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "list of experience"));
    onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setListOfExperience(itemsArr);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        listOfExperience,
        listOfFavPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
