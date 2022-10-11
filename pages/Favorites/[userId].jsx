/** @format */
import Link from "next/link";
import { db } from "../../Firebase/firebase";
import styles from "../../styles/List.module.css";
/** @format */
const Fav = (props) => {
  const favorites = JSON.parse(props.favorites);
  return (
    <div className={styles.cart}>
      <div className="label">My Favourites</div>
      {favorites &&
        favorites.map((product) => {
          return (
            <Link
              href={"/ProductDetails/" + product.productId}
              key={product.productId}
            >
              <a className={styles.cartItem}>
                <img src={product.productImgs} alt={product.productImgs} />
                <div className={styles.itemDesc}>
                  <div className={styles.itemName}>{product.productName}</div>
                  <div className={styles.itemPrice}>
                    ${product.productPrice}
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
    </div>
  );
};

export default Fav;
export async function getServerSideProps(context) {
  const { collection, getDocs, query, where } = await import(
    "firebase/firestore"
  );
  // const db = import("../../Firebase/firebase");

  const { params } = context;
  const favorites = [];
  const querySnapshot = await getDocs(
    query(collection(db, "favorites"), where("userId", "==", params.userId))
  );

  querySnapshot.forEach((doc) => {
    favorites.push({ ...doc.data(), id: doc.id });
  });
  return {
    props: {
      favorites: JSON.stringify(favorites),
    },
  };
}
