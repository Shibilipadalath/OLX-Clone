import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Heart from "../../assets/Heart";
import "./Post.css";

import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore().collection("products").get();
        const allProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductList(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <section className="moreView">
        <header className="heading">
          <span>Quick Menu</span>
        </header>

        <div className="cards">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                setPostDetails(product);
                navigate("/view");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="favorite">
        <Heart />
      </div>
      <div className="image">
        <img src={product.url} alt={product.name} loading="lazy" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="category">{product.category}</span>
        <p className="name">{product.name}</p>
      </div>
      <div className="date">
        <span>{product.createdAt}</span>
      </div>
    </div>
  );
}

export default Posts;
