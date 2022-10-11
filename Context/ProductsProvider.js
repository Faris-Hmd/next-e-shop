/** @format */
import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
  // console.log("hi from pro provider");
  const [products, setProducts] = useState();
  const [offers, setOffers] = useState();
  const [prevCategory, setPrevCategory] = useState();

  const getData = async ({ category }) => {
    if (category === prevCategory) return;
    setPrevCategory(category);
    console.log("hi from getData");
    setProducts();
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("productCate", "==", category))
    );
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setProducts(arr);
  };
  const getOffers = async () => {
    // console.log("get offers")
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("isOffer", "==", true))
    );
    const arr = [];
    querySnapshot.forEach((doc) =>
      arr.push({ ...doc.data(), id: doc.id })
    );
    setOffers(arr);
  };
  useEffect(() => {
    getOffers();
  }, []);
  return (
    <ProductsContext.Provider value={{ products, getData, offers }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
