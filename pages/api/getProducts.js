/** @format */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  console.log(
    "-------get products-------------------------------"
  );
  const q = await getDocs(collection(db, "products"));

  const products = q.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });
  // console.log(products);
  res.status(200).json(products);
}
