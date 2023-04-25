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
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //Login with email and password

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //Logout

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //Login with Google Provider
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
