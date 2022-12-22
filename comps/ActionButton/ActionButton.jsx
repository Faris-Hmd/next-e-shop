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
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { UserContext } from "../../Context/UserProvider";
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
    fetch("http://localhost:3000/api/favorites?id=" + product.id + user.id)
      .then((res) => res.json())
      .then((data) => setIsFavorite(data));
  };

  const handleAddTofavo = async () => {
    const data = {
      productId: product.id,
      userId: user.id,
      productImgs: product.productImgs[0].url,
      productName: product.productName,
      productCate: product.productCate,
      productPrice: product.productPrice,
    };
    const response = await fetch(
      "http://localhost:3000/api/favorites?id=" + product.id + user.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );
    const { state } = await response.json();
    console.log(state);
    if (state === true) setIsFavorite(true);
  };
  const removeFromFavo = async () => {
    const response = await fetch(
      "http://localhost:3000/api/favorites?id=" + product.id + user.id,
      { method: "DELETE" }
    );
    const { state } = await response.json();
    console.log(state);
    if (state === true) setIsFavorite(false);
  };

  // const addLike = async () => {
  //   if (!user) {
  //     t();
  //     return;
  //   }
  //   if (isLiked) return;
  //   setIsDisliked(false);
  //   setDoc(doc(db, "rating", user.id + product.id), {
  //     userId: user.id,
  //     productId: product.id,
  //     rating: "like",
  //   })
  //     .then(setIsLiked(true))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const addDislike = async () => {
  //   if (!user) {
  //     t();
  //     return;
  //   }
  //   if (isDisliked) return;
  //   setIsLiked(false);
  //   setDoc(doc(db, "rating", user.id + product.id), {
  //     userId: user.id,
  //     productId: product.id,
  //     rating: "dislike",
  //   })
  //     .then(setIsDisliked(true))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  useEffect(() => {
    // user && getRating();
    user && getFavorites();
  }, [user]); //eslint-disable-line
  return (
    <div className={styles.socialBtnCon}>
      {/* <div
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
      </div> */}
      {/* <div
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
      </div> */}
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
          user && isFavorite === false && handleAddTofavo();
          user && isFavorite === true && removeFromFavo(product.id);
        }}
      >
        {isFavorite ? <FaStar size={"20px"} /> : <FaRegStar size={"20px"} />}
        Favorite
      </div>
    </div>
  );
}
