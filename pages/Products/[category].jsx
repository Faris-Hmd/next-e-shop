/** @format */
import Link from "next/link";
import styles from "../../styles/Products.module.css";
const Products = (props) => {
  const products = props.products;
  console.log(products);
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
  const data = await fetch("http://localhost:3000/api/getProducts").then(
    (res) => res.json()
  );
  console.log(data);
  return {
    props: {
      products: data.products,
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
