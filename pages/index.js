/** @format */

import { Categoris } from "../comps/Categories/Categories";
import Welcome from "../comps/Welcome/Welcome";
const internetUrl = "https://next-e-shop-omega.vercel.app";
const localurl = " http://localhost:3002";
export const baseUrl = internetUrl;

const Home = () => {
  return (
    <div className="main">
      <Welcome />
      <Categoris />
    </div>
  );
};

export default Home;
