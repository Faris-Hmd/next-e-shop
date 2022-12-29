/** @format */
import Link from "next/link";
import { baseUrl } from "..";
import styles from "../../styles/Products.module.css";

const Products = ({ products }) => {
  return (
    <>
      <div className="label">Products</div>
      <div className={styles.productsContainer}>
        {products?.map((product) => {
          return (
            <Link
              className={styles.product}
              key={product.id}
              href={`/ProductDetails/${product.id}`}
            >
              <div
                className={styles.productCoverImg}
                style={{
                  backgroundImage: `url(${product.productImgs[0].url})`,
                }}
              ></div>
              <div className="sep-line"></div>

              <div className={styles.productDetails}>
                <div className={styles.productName}>{product.productName}</div>
                <div className={styles.productRating}>
                  rating : {product.rating}
                </div>
                <div className={styles.productPrice}>
                  price : <span>${product.productPrice}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Products;
export const getStaticProps = async (context) => {
  // console.log(context.params.category);
  const res = await fetch(
    `${baseUrl}/api/getProducts?category=${context.params.category}`
  );
  const products = await res.json();
  // console.log(products);
  return {
    props: {
      products,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { category: "pc" } }, { params: { category: "phones" } }],
    fallback: false,
  };
};
