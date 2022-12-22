/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const url = new URL("http://localhost:3002/" + req.url);
  const searchParams = url.searchParams;
//   console.log(searchParams.get("id"));
  const q = await getDoc(doc(db, "products", searchParams.get("id")));
  const product = { ...q.data(), id: q.id };
  res.status(200).json({ product });
}
