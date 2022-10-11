/** @format */
import { SwiperSlide } from "swiper/react";
import styles from "../../styles/offers.module.css";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect } from "react";
export function Offers({ offers }) {
  SwiperCore.use([Navigation, Pagination]);
  useEffect(() => {
    const getOffer = () => {
      
    }
  })
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation={true}
      pagination={{ clickable: true }}
    >
      {offers &&
        offers.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styles.offerCon}>
                <img
                  src={product.productImgs[0].url}
                  alt={product.productName}
                  className={styles.offerImg}
                />
                {
                  <div className={styles.offerTextCon}>
                    <div className={styles.offerText}>{product.productName}</div>
                    <div className={styles.offerPrice}>
                      cost : <span>${product.productPrice}</span>
                    </div>
                  </div>
                }
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
