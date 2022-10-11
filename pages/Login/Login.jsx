/** @format */

import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import { UserContext } from "../../Context/UserProvider";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, user } = useContext(UserContext);
  const nav = useRouter();
  useEffect(() => {
    if (user) {
      nav.push("/");
    }
  }, [user]); // eslint-disable-line

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
