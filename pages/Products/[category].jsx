/** @format */
import Link from "next/link";
import styles from "../../styles/Products.module.css";
import { db } from "../../Firebase/firebase";
const Products = (props) => {
  const products = JSON.parse(props.products);
  return (
    <>
      <div className="label">Products</div>
      <div className={styles.productsContainer}>
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Link key={product.id} href={`/ProductDetails/${product.id}`}>
                <a className={styles.product}>
                  <div
                    className={styles.productCoverImg}
                    style={{
                      backgroundImage: `url(${product.productImgs[0].url})`,
                    }}
                  ></div>
                  <div className="sep-line"></div>

                  <div className={styles.productDetails}>
                    <div className={styles.productName}>
                      {product.productName}
                    </div>
                    <div className={styles.productRating}>
                      rating : {product.rating}
                    </div>
                    <div className={styles.productPrice}>
                      price : <span>${product.productPrice}</span>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })
        ) : (
          <h2>loding...</h2>
        )}
      </div>
    </>
  );
};

export default Products;

export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params);
  const { collection, getDocs, query, where } = await import(
    "firebase/firestore"
  );
  const arr = [];
  const querySnapshot = await getDocs(
    query(
      collection(db, "products"),
      where("productCate", "==", params.category)
    )
  );
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return {
    props: {
      products: JSON.stringify(arr),
    },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { category: "phones" },
//       },
//       {
//         params: { category: "pc" },
//       },
//       {
//         params: { category: "speakers" },
//       },
//       {
//         params: { category: "headphone" },
//       },
//       {
//         params: { category: "playstation" },
//       },
//       {
//         params: { category: "hard drive" },
//       },
//       {
//         params: { category: "watch" },
//       },
//       {
//         params: { category: "storge" },
//       },
//     ],
//     fallback: false,
//   };
// }
