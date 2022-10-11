/** @format */
import { useContext } from "react";
// import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import styles from  "./User.module.css";
const UserProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.user}>
      <div className={styles.userDetail}>
        <img src={user.profileImg} alt={user.profileImg} />
        <div className={styles.userName}>{user.name}</div>
      </div>
    </div>
  );
};

export default UserProfile;
