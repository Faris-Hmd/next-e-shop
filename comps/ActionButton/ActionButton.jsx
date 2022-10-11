/** @format */
import { useContext, useState, useEffect } from "react";
import {
  FaPhone,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaStar,
  FaThumbsDown,
  FaThumbsUp,
  FaWhatsapp,
} from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { UserContext } from "../../Context/UserProvider";
import { db } from "../../Firebase/firebase";
import styles from "./ActionButton.module.css";
export function ActionButtons({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoDocRef, setFavoDocRef] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { user } = useContext(UserContext);
  const t = () => {
    toast.warning("you have to be login ");
  };
  const getFavorites = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "favorites"), where("userId", "==", user.id)),
      where("productId", "==", product.id)
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().productId === product.id) {
        setFavoDocRef(doc.id);
        setIsFavorite(true);
      }
    });
  };

  const getRating = async () => {
    const querySnapshot = await getDoc(
      doc(db, "rating", user.id + product.id)
    ).catch((e) => console.log(e));
    if (querySnapshot.exists()) {
      if (querySnapshot.data().rating === "like") setIsLiked(true);
      if (querySnapshot.data().rating === "dislike") setIsDisliked(true);
    }
  };

  const handleAddTofavo = async (id) => {
    try {
      const docRef = await addDoc(collection(db, "favorites"), {
        productId: product.id,
        userId: user.id,
        productImgs: product.productImgs[0].url,
        productName: product.productName,
        productCate: product.productCate,
        productPrice: product.productPrice,
        date: serverTimestamp(),
      }).then(setIsFavorite(true));
      console.log("Document written with ID: ", docRef.id);
      setFavoDocRef(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeFromFavo = () => {
    deleteDoc(doc(db, "favorites", favoDocRef))
      .then(setIsFavorite(false))
      .catch((e) => console.log(e));
  };

  const addLike = async () => {
    if (!user) {
      t();
      return;
    }
    if (isLiked) return;
    setIsDisliked(false);
    setDoc(doc(db, "rating", user.id + product.id), {
      userId: user.id,
      productId: product.id,
      rating: "like",
    })
      .then(setIsLiked(true))
      .catch((e) => {
        console.log(e);
      });
  };

  const addDislike = async () => {
    if (!user) {
      t();
      return;
    }
    if (isDisliked) return;
    setIsLiked(false);
    setDoc(doc(db, "rating", user.id + product.id), {
      userId: user.id,
      productId: product.id,
      rating: "dislike",
    })
      .then(setIsDisliked(true))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    user && getRating();
    user && getFavorites();
  }, [user]); //eslint-disable-line
  return (
    <div className={styles.socialBtnCon}>
      <div
        className={styles.socialBtn}
        onClick={() => {
          addLike();
        }}
      >
        {isLiked ? (
          <FaThumbsUp size={"20px"} />
        ) : (
          <FaRegThumbsUp size={"20px"} />
        )}
        Like
      </div>
      <div
        className={styles.socialBtn}
        onClick={() => {
          addDislike();
        }}
      >
        {isDisliked ? (
          <FaThumbsDown size={"20px"} />
        ) : (
          <FaRegThumbsDown size={"20px"} />
        )}
        dislike
      </div>
      <div>
        <a className={styles.socialBtn} href={"tel:00" + product.ownerPhone}>
          <FaPhone size={"20px"} />
          Call
        </a>
      </div>
      <div>
        <a
          className={styles.socialBtn}
          href={"https://wa.me/" + product.ownerPhone}
        >
          <FaWhatsapp size={"20px"} />
          WhatsUp
        </a>
      </div>
      <div
        className={styles.socialBtn}
        onClick={() => {
          !user && t();
          user && isFavorite === false && handleAddTofavo(product.id);
          user && isFavorite === true && removeFromFavo();
        }}
      >
        {isFavorite ? <FaStar size={"20px"} /> : <FaRegStar size={"20px"} />}
        Favorite
      </div>
    </div>
  );
}
