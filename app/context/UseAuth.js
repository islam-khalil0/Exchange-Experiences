import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    googleSignIn,
    logOut,
  };
};
