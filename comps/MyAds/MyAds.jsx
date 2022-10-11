/** @format */

import { collection, getDocs, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { TbDiamond } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { db } from "../../Firebase/firebase";

const MyAds = () => {
  const [products, setProduct] = useState();
  const nav = useNavigate();
  const user = useContext(UserContext);
  const getMyAd = async () => {
    const querySnapshot = await getDocs(
      collection(db, "products"),
      where("ownerId", "==", user.id)
    );
    const arr = [];
    querySnapshot.forEach((doc) =>
      arr.push({ ...doc.data(), productId: doc.id })
    );
    setProduct(arr);
  };
  useEffect(() => {
    !products && getMyAd();
  }, []); //eslint-disable-line
  return (
    <div className="cart">
      <div className="label cart-label">My Advartises</div>
      {products &&
        products.map((product) => {
          return (
            <div
              //   to={"/productDetail/" + product.productId}
              className="cart-item Link  sp-btw"
              key={product.productId}
            >
              <img
                src={product.productImgs[0].url}
                alt={product.productImgs[0].url}
              />
              <div className="item-desc">
                <div className="item-name">{product.productName}</div>
                <div className="item-price">${product.productPrice}</div>
              </div>
              {
                <div className="isOffer">
                  {product.isOffer === true ? <TbDiamond size={"20px"} /> : ""}
                </div>
              }
              <div className="edit-btns">
                <div
                  className="delete-btn"
                  onClick={() => {
                    nav("/EditAd/" + product.productId);
                  }}
                >
                  <FaPen />
                </div>
                <div className="edit-btn">
                  <FaPen />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default MyAds;
