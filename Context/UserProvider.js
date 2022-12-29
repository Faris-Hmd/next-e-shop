/** @format */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const setUserData = (user) => {
    setCurrentUser({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      profileImg: user.providerData[0].photoURL,
    });
  };

  //----------------------- SIGNOUT -----------------------
  const handleSignout = async () => {
    const { auth } = await import("../Firebase/firebase");
    console.log("from out");
    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
        window.localStorage.removeItem("currentUser");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (window.localStorage.getItem("currentUser") !== null) {
      const user = JSON.parse(window.localStorage.getItem("currentUser"));
      setUserData(user);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleSignout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
