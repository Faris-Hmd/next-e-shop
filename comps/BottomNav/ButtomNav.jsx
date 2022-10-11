/** @format */
import styles from "../../styles/ButtomNav.module.css";
import { FaBars, FaHome } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { UserContext } from "../../Context/UserProvider";
import Link from "next/link";
import { useContext } from "react";
const ButtomNav = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.buttomNav}>
      <Link href="/">
        <a className={styles.page}>
          <FaHome size={"20px"} /> Home
        </a>
      </Link>
      <Link href="/AddAd">
        <a className={styles.page}>
          <BiPlusCircle size={"20px"} />
          Add AD
        </a>
      </Link>
      <Link href="/Menu">
        <a className={styles.page}>
          <FaBars size={"19px"} /> Menu
        </a>
      </Link>
      <Link href={user ? `/Favorites/${user.id}` : "/Login"}>
        <a className={styles.page}>
          <FaRegStar size={"19px"} /> Favorite
        </a>
      </Link>
    </div>
  );
};

export default ButtomNav;
