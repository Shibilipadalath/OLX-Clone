import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date();

  const handleSubmit = () => {
    if (!name || !category || !price || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    if (!/(\.jpg|\.jpeg|\.png)$/i.test(image.name)) {
      alert("Only JPG, JPEG, or PNG images are allowed.");
      return;
    }

    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          navigate("/");
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <div style={{ paddingTop: "100px" }}>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <input
            className="create-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
          />

          <label htmlFor="category">Category</label>
          <input
            className="create-input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
          />

          <label htmlFor="price">Price</label>
          <input
            className="create-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="price"
          />

          {image && (
            <img
              className="preview-img"
              alt="Preview"
              width="100%"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
