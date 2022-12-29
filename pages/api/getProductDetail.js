/** @format */

import { baseUrl } from "..";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  console.log(searchParams.get("productId"));
  const q = await getDoc(doc(db, "products", searchParams.get("productId")));
  const product = { ...q.data(), id: q.id };
  // const localProducts = [
  //   {
  //     date: { seconds: 1667892373, nanoseconds: 498000000 },
  //     productCate: "phones",
  //     productName: "Moons",
  //     rating: 0,
  //     productDesc: "Moons",
  //     comments: [],
  //     ownerPhone: "249966626693",
  //     productPrice: "1900",
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/7196595F-EDCC-49C9-B8B3-00D9C17D58EC.jpeg?alt=media&token=389ab4e0-8a28-444d-9791-d2875ab0642d",
  //       },
  //     ],
  //     isOffer: false,
  //     id: "1gTHPqFfkkSy6U1bIuD8",
  //   },
  //   {
  //     rating: 0,
  //     productCate: "phones",
  //     comments: [],
  //     productName: "iphone 14 pro max",
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/iphone14.jpg?alt=media&token=dee01d36-5e23-4672-aab0-5da57889c17f",
  //       },
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/79511E04-B253-4EB5-811F-0E7FDA5A91EE.jpeg?alt=media&token=007cb8f9-0727-47e0-b907-af660a0f4a9c",
  //       },
  //     ],
  //     productDesc: "iphone 14 pro max ",
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     productPrice: "189999",
  //     date: { seconds: 1665070634, nanoseconds: 885000000 },
  //     EditedAt: { seconds: 1665134527, nanoseconds: 81000000 },
  //     ownerPhone: "249966626693",
  //     isOffer: false,
  //     id: "X3x2BDoIRltgDDtGRLdR",
  //   },
  //   {
  //     comments: [],
  //     productDesc: "",
  //     isOffer: false,
  //     rating: 0,
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/3B2E02F9-5479-43A4-8522-A78DF4CC5611.jpeg?alt=media&token=0e671eac-9b4e-45ad-9c4a-9c54a93ca2e1",
  //       },
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/5BB7BB59-4AA7-4D94-8A15-7288A5A3036A.jpeg?alt=media&token=b17d6b43-209e-4e31-844f-ff9eb5495d6a",
  //       },
  //     ],
  //     date: { seconds: 1665154073, nanoseconds: 345000000 },
  //     productCate: "pc",
  //     ownerPhone: "249966626693",
  //     productName: "The moon",
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     productPrice: "99999",
  //     id: "h9nEZsMzOFen9orE2T2F",
  //   },
  //   {
  //     productCate: "phones",
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/oppo-offers.jpg?alt=media&token=a5cfde2f-afcc-4d60-95c8-b1c4d8712e01",
  //       },
  //     ],
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     comments: [],
  //     rating: 0,
  //     productDesc: "oppo",
  //     isOffer: false,
  //     date: { seconds: 1665171758, nanoseconds: 540000000 },
  //     ownerPhone: "249966626693",
  //     productName: "oppo ",
  //     productPrice: 1,
  //     id: "n3YsC2YYFQZrIgPGWxYK",
  //   },
  //   {
  //     rating: 0,
  //     productCate: "pc",
  //     ownerPhone: "249966626693",
  //     date: { seconds: 1665171954, nanoseconds: 152000000 },
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/buyback_offer_banner.png?alt=media&token=82d0ed0e-b5ad-4855-8f6a-109f58d4eaa9",
  //       },
  //     ],
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     productDesc: "buy back",
  //     isOffer: false,
  //     comments: [],
  //     productPrice: "1874",
  //     productName: "buy back ",
  //     id: "oYSOKeXp7k9d2bzNXFGo",
  //   },
  //   {
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     ownerPhone: "249966626693",
  //     rating: 0,
  //     productDesc: "dgdfhy gg",
  //     productPrice: "90000",
  //     comments: [],
  //     productName: "a23",
  //     isOffer: false,
  //     productCate: "phones",
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/istockphoto-1173373272-170667a.jpg?alt=media&token=1f4e0c3c-63e9-4ffe-9bd8-298dd3bc8950",
  //       },
  //     ],
  //     date: { seconds: 1665553706, nanoseconds: 329000000 },
  //     id: "oo9Ea4gMYRF7JYvOHjRZ",
  //   },
  //   {
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     ownerPhone: "24966626693",
  //     date: { seconds: 1665068573, nanoseconds: 582000000 },
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/s22ultra.jpg?alt=media&token=64b2e666-2e20-4904-8c8b-06f5f6342d9a",
  //       },
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/iphone14.jpg?alt=media&token=718b189c-0728-4e21-9eab-4c52a5cd4d88",
  //       },
  //     ],
  //     productPrice: "200000",
  //     EditedAt: { seconds: 1665094196, nanoseconds: 808000000 },
  //     productCate: "phones",
  //     comments: [],
  //     productDesc: "s22",
  //     isOffer: false,
  //     rating: 1,
  //     productName: "samsung S22 ultra",
  //     id: "qaLCLvxJ4OoDEGrUGAeM",
  //   },
  //   {
  //     rating: 0,
  //     date: { seconds: 1665095791, nanoseconds: 872000000 },
  //     comments: [],
  //     ownerPhone: "249966626693",
  //     ownerId: "9dkr6T0fR7gBHf2nPDQGMjD24i62",
  //     productCate: "pc",
  //     isOffer: false,
  //     productName: "wireless tech",
  //     productImgs: [
  //       {
  //         url: "https://firebasestorage.googleapis.com/v0/b/e-shop-41e42.appspot.com/o/wireless-connection-technology-electronic-gadgets-and-devices-isometric-icons-collection-with-printer-router-and-keyboard-isolated-vector-illustration-2H86J90.jpg?alt=media&token=1a4c2945-cca6-4936-a1b6-b4635118538e",
  //       },
  //     ],
  //     productPrice: "1900",
  //     productDesc: "wireless technology",
  //     id: "w6HcJkchMXdEQVZI9oua",
  //   },
  // ];

  res.status(200).json(product);
}
