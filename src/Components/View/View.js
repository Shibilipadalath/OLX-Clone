import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (!postDetails || !postDetails.userId) return;

    const fetchUserDetails = async () => {
      try {
        const res = await firebase
          .firestore()
          .collection("users")
          .where("id", "==", postDetails.userId)
          .get();

        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [firebase, postDetails]);

  if (!postDetails) {
    return <div className="viewParentDiv">Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p className="price">&#x20B9; {postDetails.price}</p>
          <span className="name">{postDetails.name}</span>
          <p className="category">{postDetails.category}</p>
          <span className="date">{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p className="title">Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
