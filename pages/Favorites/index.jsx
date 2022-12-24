/** @format */
import Link from "next/link";
import styles from "../../styles/List.module.css";
/** @format */
const Favorites = () => {

  
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

export default Favorites;
