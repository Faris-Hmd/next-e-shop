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
          <Link href="/">
            <a className={styles.opt}>
              <BsHouseDoor />
              Home
            </a>
          </Link>
          <Link href="/AddOffer">
            <a className={styles.opt}>
              <BiCategoryAlt /> Add Offer
            </a>
          </Link>
          <Link href="/addAd">
            <a className={styles.opt}>
              <BiPlusCircle />
              Add Advartise
            </a>
          </Link>
          <Link href="/MyAds">
            <a className={styles.opt}>
              <RiAdvertisementLine /> My Advartisments
            </a>
          </Link>
          {user && (
            <Link href={"/Favorites/" + user.id}>
              <a className={styles.opt}>
                <FaRegStar />
                Favorites
              </a>
            </Link>
          )}
          <Link href="/">
            <a className={styles.opt}>
              <BiCategoryAlt /> Categories
            </a>
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
          <Link href="/cart">
            <a className={styles.opt}>
              <MdOutlinePrivacyTip />
              Privecy and Security
            </a>
          </Link>
          <Link href="/login">
            <a className={styles.opt}>
              <BsInfoCircle />
              About
            </a>
          </Link>

          {user === null ? (
            <>
              <Link href="/login">
                <a className={styles.opt}>
                  <MdOutlineLogin />
                  Login
                </a>
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
