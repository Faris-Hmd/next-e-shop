/** @format */

import { Categoris } from "../comps/Categories/Categories";
import Welcome from "../comps/Welcome/Welcome";
const Home = () => {
  return (
    <div className="main">
      <Welcome />
      <Categoris />
    </div>
  );
};

export default Home;
