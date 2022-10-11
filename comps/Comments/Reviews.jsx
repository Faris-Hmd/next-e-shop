/** @format */
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import "./reviews.css"
export function Reviews() {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const getReviews = async () => {
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "comments"), where("productId", "==", id), limit(5))
    );
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setComments(arr);
  };
  useEffect(() => {
    getReviews();
  }, []); //eslint-disable-line
  return (
    <div className="comments-container">
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="comment" key={comment.date}>
              {user && comment.autherId === user.id && (
                <div className="date">MY</div>
              )}
              <div className="auther">
                {/* <img
                  src={comment.auther.img}
                  alt={comment.auther.name}
                  className="auther_img"
                /> */}
                <div className="auther_name">{comment.auther.email}</div>
              </div>

              <div className="comment-body">{comment.commentBody} </div>
            </div>
          );
        })}
    </div>
  );
}
