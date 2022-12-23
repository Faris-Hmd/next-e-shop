/** @format */
import { useContext } from "react";
import { IconContext } from "react-icons";
import {
  BsFillMoonFill,
  BsHouseDoor,
  BsInfoCircle,
  BsSunFill,
} from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";

import { MdOutlineLogin, MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { BiCategoryAlt, BiPlusCircle } from "react-icons/bi";

import UserProfile from "../../comps/User/User";
import { UserContext } from "../../Context/UserProvider";
import styles from "./Menu.module.css";
import { ThemeContext } from "../../Context/themeContext";
import Link from "next/link";

const Menu = () => {
  const { user, handleSignout } = useContext(UserContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconContext.Provider value={{ className: styles.menuIcons }}>
      <div className={styles.menu}>
        {user && <UserProfile />}
        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <BsHouseDoor />
            Home
          </Link>
          <Link href="/AddOffer" className={styles.opt}>
            <BiCategoryAlt /> Add Offer
          </Link>
          <Link href="/addAd" className={styles.opt}>
            <BiPlusCircle />
            Add Advartise
          </Link>
          <Link href="/MyAds" className={styles.opt}>
            <RiAdvertisementLine /> My Advartisments
          </Link>
          {user && (
            <Link href={"/Favorites/" + user.id} className={styles.opt}>
              <FaRegStar />
              Favorites
            </Link>
          )}
          <Link href="/" className={styles.opt}>
            <BiCategoryAlt /> Categories
          </Link>
          <div className={styles.opt} onClick={() => toggleTheme()}>
            {darkMode ? (
              <BsSunFill size={"20px"} />
            ) : (
              <BsFillMoonFill size={"20px"} />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </div>
        <div className={styles.optCon}>
          <Link href="/cart" className={styles.opt}>
            <MdOutlinePrivacyTip />
            Privecy and Security
          </Link>
          <Link href="/login" className={styles.opt}>
            <BsInfoCircle />
            About
          </Link>

          {user === null ? (
            <>
              <Link href="/login" className={styles.opt}>
                <MdOutlineLogin />
                Login
              </Link>
            </>
          ) : (
            <div
              className={styles.opt}
              onClick={() => {
                handleSignout();
              }}
            >
              <VscSignOut />
              Logout
            </div>
          )}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Menu;
