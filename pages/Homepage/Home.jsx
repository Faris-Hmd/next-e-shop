/** @format */
// import  "./Home.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Categoris } from "../../comps/Categories/Categories";
import { Offers } from "../../comps/offers/Offers";
import { db } from "../../Firebase/firebase";
import Welcome from "../../comps/Welcome/Welcome";
// import { SimelerProduct } from "../../comps/SimelerProducts/SimelerProducts";
// import { LateestProducts } from "../../comps/LatetestProducts/LatestProduct";
const Home = ({ offers }) => {
  const [locOffes, setLocOffers] = useState(offers && JSON.parse(offers));
  return (
    <div className="main">
      <Welcome />
      <div className="label">Special Offers</div>
      <Offers offers={locOffes} />
      {/* <div className="label">Latest Products</div> */}
      {/* <LateestProducts /> */}
      <Categoris />
      {/* <div className="label">Simeler Products</div> */}
      {/* <SimelerProduct /> */}
    </div>
  );
};

export default Home;
export async function getStaticProps() {
  const querySnapshot = await getDocs(
    query(collection(db, "products"), where("isOffer", "==", true))
  );
  const arr = [];
  querySnapshot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
  console.log(arr);
  return {
    props: {
      offers: JSON.stringify(arr),
    },
  };
}
