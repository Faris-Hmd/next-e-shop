/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
// import { Offers } from "../../comps/Offers/Offers";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "../../styles/ProductsDetail.module.css";
import { ActionButtons } from "../../comps/ActionButton/ActionButton";
const ProductsDetail = (props) => {
  SwiperCore.use([Navigation, Pagination]);
  const product = props.product;
  return product ? (
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
              <img src={img.url} alt={img.url} className={styles.productImgs} />
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
  ) : (
    <h2>loading...</h2>
  );
};

export default ProductsDetail;
export async function getServerSideProps(context) {
  const { params } = context;
  const product = await getProductDetail();
  // const offers = await getOffers();
  return {
    props: {
      // offers: JSON.stringify(offers),
      product: product,
    },
  };

  // async function getOffers() {
  //   const offers = [];
  //   const querySnapshot = await getDocs(
  //     query(collection(db, "products"), where("isOffer", "==", true))
  //   );
  //   querySnapshot.forEach((doc) => offers.push({ ...doc.data(), id: doc.id }));
  //   return offers;
  // }

  async function getProductDetail() {
    const data = await fetch(
      "http://localhost:3000/api/getProductDetail?id=" + params.productId
    ).then((res) => res.json());
    return data.product;
  }
}

function loginRequest(nav) {
  return (
    <div className="login-request" onClick={() => nav("/login")}>
      You neen to be login to write comment
    </div>
  );
}
