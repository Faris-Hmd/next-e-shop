/** @format */
import ButtomNav from "../BottomNav/ButtomNav";
import Navbar from "../Navbar/Navbar";
const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="rightSide"> </div>
      <div className="leftSide"> </div>

      <Navbar />
      <ButtomNav />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
