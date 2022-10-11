/** @format */
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Slider from "../ImagesSlider/Slider";
import { db } from "../../Firebase/firebase";

import { useEffect, useState } from "react";
export function LateestProducts() {
  const nav = useNavigate();
  const [products, setProduct] = useState();
  const navTo = (id) => {
    nav("/productDetail/" + id);
  };

  const getLatestes = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "products"), orderBy("date", "desc"), limit(10))
    );
    const arr = [];
    querySnapshot.forEach((doc) =>
      arr.push({ ...doc.data(), productId: doc.id })
    );
    setProduct(arr);
  };
  useEffect(() => {
    getLatestes();
  }, []);
  return (
    <Slider>
      {products &&
        products.map((product, index) => {
          return (
            <SwiperSlide key={index} onClick={() => navTo(product.productId)}>
              <div className="img-con">
                <img
                  src={product.productImgs[0].url}
                  alt={index}
                  className="slider-img"
                />
                {
                  <div className="img-text-con">
                    <div className="img-text">{product.productName}</div>
                    <div className="cost">
                      cost : <span>${product.productPrice}</span>
                    </div>
                  </div>
                }
              </div>
            </SwiperSlide>
          );
        })}
    </Slider>
  );
}
