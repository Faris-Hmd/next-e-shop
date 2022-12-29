/** @format */
import { useContext } from "react";
// import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import styles from "./User.module.css";
const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.user}>
      <div className={styles.userDetail}>
        <img src={currentUser.profileImg} alt={currentUser.profileImg} />
        <div className={styles.userName}>{currentUser.name}</div>
      </div>
    </div>
  );
};

export default UserProfile;
