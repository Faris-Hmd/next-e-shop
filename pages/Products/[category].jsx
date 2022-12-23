/** @format */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "../../styles/Products.module.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    return await fetch("http://localhost:3002/api/getProducts").then((res) => {
      return res.json();
    });
  };

  const { data, status } = useQuery("product", getData, { staleTime: 30000 });
  useEffect(() => {
    // getData().then((data) => setProducts(data));
    // setProducts(data);
  }, [data]);

  if (status === "loading") return <h1>loading query...</h1>;
  if (status === "error") return <h1>error </h1>;

  return (
    <>
      <div className="label">Products</div>
      <div className={styles.productsContainer}>
        {data.map((product) => {
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

// export async function getServerSideProps(context) {
//   const data = await fetch("http://localhost:3000/api/getProducts").then(
//     (res) => res.json()
//   );
//   console.log(data);
//   return {
//     props: {
//       products: data.products,
//     },
//   };
// }
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
