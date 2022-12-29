/** @format */

import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import { UserContext } from "../../Context/UserProvider";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { auth } from "../../Firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const nav = useRouter();

  const getRedirectResultFunc = async () => {
    getRedirectResult(auth)
      .then((result) => {
        setUserData(result.user);
        window.localStorage.setItem("currentUser", JSON.stringify(user));
        window.localStorage.setItem("loginReq", "false");
      })
      .catch((error) => {
        window.localStorage.setItem("loginReq", "false");
        console.log(error);
      });
  };

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
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).then(
      window.localStorage.setItem("loginReq", "true")
    );
  };

  useEffect(() => {
    if (currentUser) nav.push("/");
  }, [currentUser]); // eslint-disable-line

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

  return !isLoading ? (
    <>
      <div className="label">Login</div>
      <div className={styles.buttonCon}>
        <div
          className={styles.googleButton}
          onClick={() => {
            handleLogin();
            setIsLoading(true);
          }}
        >
          <FcGoogle widths={50} />
          SignIn with google
        </div>
      </div>
    </>
  ) : (
    <h2>loading...</h2>
  );
};

export default Login;
