/** @format */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
export default async function handler(req, res) {
  const url = new URL("http://localhost:3000/" + req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  if (req.method === "GET") {
    const querySnapshot = await getDoc(doc(db, "favorites", id));
    const isFav = querySnapshot.exists() ? true : false;
    console.log("is fav", isFav);
    res.status(200).json(isFav);
  } else if (req.method === "POST") {
    const data = req.body.data;
    setDoc(doc(db, "favorites", id), {
      ...data,
      date: serverTimestamp(),
    });
    res.status(200).json({ state: true });
  } else if (req.method === "DELETE") {
    deleteDoc(doc(db, "favorites", id));
    res.status(200).json({ state: true });
  }
}
