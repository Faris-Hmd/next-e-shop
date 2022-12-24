/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const url = new URL("https://next-e-shop-omega.vercel.app/" + req.url);
  const searchParams = url.searchParams;
  console.log(searchParams.get("productId"));
  const q = await getDoc(doc(db, "products", searchParams.get("productId")));
  const product = { ...q.data(), id: q.id };
  res.status(200).json(product);
}
