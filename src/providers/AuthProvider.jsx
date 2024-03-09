"use client";

import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import { auth } from "@/utils/firebase.config";
import Cookies from "js-cookie";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to hold authentication status
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // Github Login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider)
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  const handleUpdateProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // update user profile
  const updateUserProfiole = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    })
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // loging Account
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // logOut account
  const logOut = async () => {
    setLoading(true);
    Cookies.remove("token", { path: "/", secure: false, sameSite: "Strict" });
    localStorage.removeItem("email");
    return signOut(auth)
      .finally(() => setLoading(false))
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  // using Observer to listen to user authentication changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
      localStorage.setItem("email", user?.email);
      if (user?.email) {
        const userEmail = { email: user?.email };
        axiosPublic
          .post("/jwt", userEmail, {
            withCredentials: true,
          })
          .catch(error => console.error("Error posting user email:", error));
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  // Function to check if user is logged in
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const authentication = {
    googleLogin,
    githubLogin,
    createUser,
    user,
    signin,
    logOut,
    loading,
    handleUpdateProfile,
    updateUserProfiole,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
