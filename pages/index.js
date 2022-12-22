import { Categoris } from "../comps/Categories/Categories";
import Welcome from "../comps/Welcome/Welcome";
const Home = ({ offers }) => {
  return (
    <div className="main">
      <Welcome />
      <div className="label">Special Offers</div>
      {/* <Offers offers={JSON.parse(offers)} /> */}
      {/* <div className="label">Latest Products</div> */}
      {/* <LateestProducts /> */}
      <Categoris />
      {/* <div className="label">Simeler Products</div> */}
      {/* <SimelerProduct /> */}
    </div>
  );
};

export default Home;
// export async function getServerSideProps() {
//   const { collection, getDocs, query, where } = await import(
//     "firebase/firestore"
//   );
//   const querySnapshot = await getDocs(
//     query(collection(db, "products"), where("isOffer", "==", true))
//   );
//   const arr = [];
//   querySnapshot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
//   return {
//     props: {
//       offers: JSON.stringify(arr),
//     },
//   };
// }
