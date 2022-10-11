/** @format */

import { SwiperSlide } from "swiper/react";
import Slider from "../ImagesSlider/Slider";
export function SimelerProduct() {
  const images = [
    {
      src: "/icons/smartphone.png",
      url: "/images/oppo-offers-min.jpg",
    },
    {
      src: "/icons/joystick.png",
      url: "/images/buyback_offer_banner-min.png",
    },
    {
      src: "/images/salad.svg",
      url: "/images/mobile-offers-min.jpg",
    },
  ];
  return (
    <Slider>
      {images.map((img, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="img-con">
              <img src={img.url} alt={img.url} className="slider-img" />
              {img.text && (
                <div className="img-text-con">
                  <div className="img-text">{img.text}</div>
                  <div className="cost">
                    cost : <span>$20000</span>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}
