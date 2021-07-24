import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // loading because to load the user there is some time buffer
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return cleanup;
  }, []);


  const createUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
    // once it creates it will auth change and run that
  };

  const loginUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email,password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const reset = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updateName = (name) => {
    return auth.currentUser.updateProfile({
      displayName : name
    })
  }

  const update = (url) => {
    return auth.currentUser.updateProfile({
      photoURL : url
    })
  }

  const updatePassword = (pw) => {
    return auth.currentUser.updatePassword(pw)
  }
  const value = {
    user,
    createUser,
    loginUser,
    logout,
    reset,
    updateName,
    updatePassword,
    update 
  };

  return (
    <AuthContext.Provider value={value}>
     
      {!loading && children}
     
    </AuthContext.Provider>
  );
}
