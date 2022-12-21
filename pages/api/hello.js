// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function handler(req, res) {


const getOffers = async () => {
    // console.log("get offers")
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("isOffer", "==", true))
    );
const arr = [];
    querySnapshot.forEach((doc) =>
      arr.push({ ...doc.data(), id: doc.id })
    );
  res.status(200).json({ arr})
}
