/** @format */
import { ReactQueryDevtools } from "react-query/devtools";
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
      <ReactQueryDevtools />
    </div>
  );
};
export default Layout;
