/** @format */
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styles from "../../styles/Products.module.css";
const getData = async ({ queryKey }) => {
  const category = queryKey[1];
  console.log(category);
  return await fetch(
    `http://localhost:3002/api/getProducts?productCate=${category}`
  ).then((res) => {
    return res.json();
  });
};
const Products = () => {
  const router = useRouter();
  const category = router.query.category;
  const { data: products, status } = useQuery([category, category], getData, {
    staleTime: 20000,
  });

  if (status === "loading") return <h1>loading query...</h1>;
  if (status === "error") return <h1>error </h1>;

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
                <div className={styles.productRating}>
                  Category : {product.productCate}
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
