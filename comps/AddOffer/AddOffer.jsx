/** @format */

import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbDiamond, TbDiamondOff } from "react-icons/tb";
import { db } from "../../Firebase/firebase";

const AddOffer = () => {
  const [term, setTerm] = useState();
  const [products, setProduct] = useState();

  const addToOffer = (productId) => {
    updateDoc(doc(db, "products", productId), {
      isOffer: true,
    });
    handleSearch();
  };
  const removefromOffer = (productId) => {
    updateDoc(doc(db, "products", productId), {
      isOffer: false,
    });
    handleSearch();
  };

  const handleSearch = async () => {
    console.log(term);
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("productName", ">=", term))
    );
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setProduct(arr);
  };
  return (
    <div className="cart">
      <div className="label cart-label">Chose the product</div>
      <form className="search-form w-90">
        <input
          type="text"
          placeholder="type what you are search for"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
        />
        <button
          type="button"
          value={""}
          className="submit-btn"
          onClick={() => handleSearch()}
        >
          <FaSearch />
        </button>
      </form>
      {products &&
        products.map((product) => {
          return (
            <div className="cart-item Link" key={product.id}>
              <img
                src={product.productImgs[0].url}
                alt={product.productImgs[0].url}
              />
              <div className="item-desc">
                <div className="item-name">{product.productName}</div>
                <div className="item-price">${product.productPrice}</div>
              </div>
              {
                <div
                  className="isOffer"
                  onClick={
                    product.isOffer
                      ? () => {
                          removefromOffer(product.id);
                        }
                      : () => addToOffer(product.id)
                  }
                >
                  {product.isOffer === true ? (
                    <TbDiamond size={"25px"} />
                  ) : (
                    <TbDiamondOff size={"25px"} />
                  )}
                </div>
              }
            </div>
          );
        })}
    </div>
  );
};
export default AddOffer;
