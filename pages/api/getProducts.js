/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const url = new URL("https://https://next-e-shop-omega.vercel.app/" + req.url);
  const searchParams = url.searchParams;
  const category = searchParams.get("productCate");
  console.log(category);
  const querySnapShot = await getDocs(
    query(collection(db, "products"), where("productCate", "==", category))
  );
  const products = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });
  // console.log(products);
  res.status(200).json(products);
}
