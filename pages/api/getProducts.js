/** @format */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  console.log(
    "----------------------------------------------------------------------------------------------"
  );
  const q = await getDocs(collection(db, "products"));

  const products = q.docs.map((product) => {
    console.log(product);
    return {
      ...product.data(),
      id: product.id,
    };
  });
  res.status(200).json({ products });
}
