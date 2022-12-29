/** @format */

import { getRedirectResult } from "@firebase/auth";
import { app } from "../../../Firebase/firebase";

export default async function handler(req, res) {
  let user;
  const { getAuth } = await import("firebase/auth");
  const auth = getAuth(app);
  getRedirectResult(auth)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json(user);
}
