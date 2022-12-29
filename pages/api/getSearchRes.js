/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { baseUrl } from "..";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const terms = searchParams.get("terms");
  console.log("------------------- ", terms);
  const querySnapShot = await getDocs(
    query(collection(db, "products"), where("productName", ">=", terms))
  );
  const products = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      productId: product.id,
    };
  });
//   console.log(products);

  res.status(200).json(products);
}
