/** @format */
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../styles/Slider.module.css";
const Slider = ({ children,preView }) => {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={preView}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation={true}
      pagination={{ clickable: true }}
    >
      {children}
    </Swiper>
  );
};

export default Slider;
