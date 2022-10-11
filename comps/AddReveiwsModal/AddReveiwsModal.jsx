/** @format */

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { db } from "../../Firebase/firebase";
import "../../Pages/login/Login.css";
import "./AddReveiwsModal.css";
export function AddReveiwModal() {
  const [isCommenting, setIsCommenting] = useState(false);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const handlAddComment = async (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    setIsCommenting(true);
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        productId: id,
        autherId: user.id,
        auther: {
          img: user.profileImg,
          email: user.email,
          name: user.name,
        },
        date: serverTimestamp(),
        commentBody: e.target[0].value,
      });
      console.log("Document written with ID: ", docRef.id);
      setIsCommenting(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsCommenting(false);
    }
  };

  return (
    <>
      <div className="button-container">
        <div className=" show-more-rev">
          show more reveiws
          <FaAngleDown size={"15px"} />
        </div>
      </div>
      <form onSubmit={(e) => handlAddComment(e)} className="comment-form">
        <textarea
      
          rows={1}
          type="text"
          placeholder="Leave Comment"
          pattern="{1-10}"
          required
        />
        <label
          className={`button send-btn ${isCommenting ? "disable" : ""} `}
          htmlFor="send-btn"
        >
          <BiSend size={"20px"} />
        </label>
        <input
          id="send-btn"
          type="submit"
          className="hidden"
          disabled={isCommenting ? true : false}
        />
      </form>
    </>
  );
}
