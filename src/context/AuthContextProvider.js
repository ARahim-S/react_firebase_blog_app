import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../utils/firebaseUtil";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

//! Create context for authentication data
const AuthContext = createContext();

//Define a function to get data from Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  //Create a new user
  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //Login with email and password

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //Logout

  const logout = () => {
    signOut(auth);
  };

  //Login with Google Provider
  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //Update Current User Email Address
  const updateUserEmail = (email) => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  //Update Current User Password
  const updateUserPassword = () => {
    // const user = auth.currentUser;
    // //const newPassword = getASecureRandomPassword();
    // updatePassword(user, newPassword)
    //   .then(() => {
    //     // Update successful.
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     // ...
    //   });
  };

  const values = {
    currentUser,
    signUp,
    login,
    logout,
    loginWithGoogle,
    updateUserPassword,
    updateUserEmail,
  };
  return (
    <AuthContext.Provider value={values}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
