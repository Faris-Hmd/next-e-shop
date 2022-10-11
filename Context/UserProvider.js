/** @format */

import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase";

const provider = new GoogleAuthProvider();
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getRedirectResultFunc = async () => {
    const { getAuth } = await import("firebase/auth");
    const auth = getAuth(app);
    getRedirectResult(auth)
      .then((result) => {
        const user = result.user;
        window.localStorage.setItem("currentUser", JSON.stringify(user));
        window.localStorage.setItem("loginReq", "false");
        setUserData(user);
      })
      .catch((error) => {
        window.localStorage.setItem("loginReq", "false");
        console.log(error);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("currentUser") !== null) {
      const user = JSON.parse(window.localStorage.getItem("currentUser"));
      setUserData(user);
    }
    if (
      window.localStorage.getItem("currentUser") === null &&
      window.localStorage.getItem("loginReq") === "true"
    ) {
      getRedirectResultFunc();
    }
  }, []); //eslint-disable-line
  // console.log("rerender auth pro");

  // -------------------- setUserData method ------------------
  const setUserData = (user) => {
    setCurrentUser({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      profileImg: user.providerData[0].photoURL,
    });
  };
  //------------------------ LOGIN ------------------
  const handleLogin = async () => {
const { getAuth } = await import("firebase/auth");
    const auth = getAuth(app);
    signInWithRedirect(auth, provider).then(
      window.localStorage.setItem("loginReq", "true")
    );
  };
  //----------------------- SIGNOUT -----------------------
  const handleSignout = async () => {
    const { getAuth } = await import("firebase/auth");
    const auth = getAuth(app);
    console.log("from out");

    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
        window.localStorage.removeItem("currentUser");
      })
      .catch((e) => console.log(e));
  };
  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        fetchUserData: setUserData,
        setCurrentUser: setCurrentUser,
        handleLogin: handleLogin,
        handleSignout: handleSignout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
