/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import styles from "../../styles/ProductsDetail.module.css";
import { ActionButtons } from "../../comps/ActionButton/ActionButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { baseUrl } from "..";
import Image from "next/image";

const ProductsDetail = ({ product }) => {
  SwiperCore.use([Navigation, Pagination]);

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
          {product.productImgs?.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  width={450}
                  height={200}
                  loader={() => img.url}
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
export async function getStaticProps(context) {
  const res = await fetch(
    `${baseUrl}/api/getProductDetail?productId=${context.params.productId}`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/getProducts`);
  const products = await res.json();
  const ids = products.map((pro) => pro.id);
  const paths = ids.map((id) => ({
    params: { productId: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
