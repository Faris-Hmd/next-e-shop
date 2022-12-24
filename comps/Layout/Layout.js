/** @format */
import { useContext } from "react";
import { ThemeContext } from "../../Context/themeContext";
import Menu from "../../pages/Menu";
import ButtomNav from "../BottomNav/ButtomNav";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  const { darkMode} = useContext(ThemeContext);
  return (
    <div className={`App ${darkMode && "dark"}`}>
      <div className="rightSide"> </div>
      <div className="leftSide">
        <Menu />
      </div>
      <Navbar />
      <ButtomNav />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
