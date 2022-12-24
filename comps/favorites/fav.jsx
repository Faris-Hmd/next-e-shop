/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { db } from "../../Firebase/firebase";
import "./Cart.css";
/** @format */
const Fav = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);

  const getFavorites = async () => {
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "favorites"), where("userId", "==", user.id))
    );

    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setCart(arr);
  };

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, []); //eslint-disable-line
  return (
    <div className="cart">
      <div className="label cart-label">My Favourites</div>
      {cart &&
        cart.map((product) => {
          return (
            <Link
              to={"/productDetail/" + product.productId}
              className="cart-item Link"
              key={product.productId}
            >
              <img src={product.productImgs} alt={product.productImgs} />
              <div className="item-desc">
                <div className="item-name">{product.productName}</div>
                <div className="item-price">${product.productPrice}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Fav;
