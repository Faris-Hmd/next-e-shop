/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import styles from "../../styles/ProductsDetail.module.css";
import { ActionButtons } from "../../comps/ActionButton/ActionButton";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const getData = async ({ queryKey }) => {
  const productId = queryKey[1];
  // console.log(productId);
  return await fetch(
    `https://next-e-shop-omega.vercel.app/api/getProductDetail?productId=${productId}`
  ).then((res) => {
    return res.json();
  });
};

const ProductsDetail = () => {
  SwiperCore.use([Navigation, Pagination]);
  const router = useRouter();
  const productId = router.query.productId;
  const [product, setProduct] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const queryClients = useQueryClient();

  const { data: fetchedData, status } = useQuery(
    ["product", productId],
    getData,
    {
      staleTime: 5000,
      enabled: isEnabled,
    }
  );

  useEffect(() => {
    // console.log(category);
    //if the data is not in cache then fetch it
    if (queryClients.getQueriesData("pc").length === 0) {
      console.log(queryClients.getQueriesData("pc").length);
      console.log("set enable to true");
      setIsEnabled(true);
      return;
    }
    const dataFromCache = queryClients
      .getQueriesData("pc")[0][1]
      ?.find((pro) => pro.id === productId);
    if (dataFromCache) setProduct(dataFromCache);
  }, []); //eslint-disable-line

  useEffect(() => {
    // fetchedData && console.log(fetchedData);
    fetchedData && setProduct(fetchedData);
  }, [fetchedData]);
  if (status === "loading") return <h1>Loading query</h1>;
  if (status === "error") return <h1>Error</h1>;

  return (
    product && (
      <div className={styles.productDetail} key={product.id}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar]}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {product.productImgs.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={img.url}
                  alt={img.url}
                  className={styles.productImgs}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="sep-line"></div>
        <div className={styles.name}>{product.productName}</div>
        <div className={styles.price}>
          Price : <span>${product.productPrice}</span>
        </div>
        <div className={styles.rating}>Rating : {product.rating}</div>
        <div className="sep-line"></div>
        <ActionButtons product={product} />
        <div className="sep-line"></div>
        <div className="label">Description</div>
        <div className={styles.desc}>{product.productDesc}</div>
        <div className="sep-line"></div>
        <div className="label">Reviews</div>
        {/* <Reviews />
         {user ? <AddReveiwModal /> : loginRequest(nav)}
          */}
        <div className="label">Offers</div>
        {/* <Offers offers={JSON.parse(props.offers)} /> */}
      </div>
    )
  );
};

export default ProductsDetail;
// function loginRequest(nav) {
//   return (
//     <div className="login-request" onClick={() => nav("/login")}>
//       You neen to be login to write comment
//     </div>
//   );
// }
