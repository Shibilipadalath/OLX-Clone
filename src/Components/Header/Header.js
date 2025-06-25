import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="Search location" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="loginPage">
          <span
            onClick={() => {
              if (!user) {
                navigate("/login");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {user ? `Hi ${user.displayName}` : "Login"}
          </span>
          <hr />
        </div>
        {user && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              firebase.auth().signOut();
              navigate("/login");
            }}
          >
            Logout
          </span>
        )}
        <div
          className="sellMenu"
          onClick={() => {
            if (user) {
              navigate("/create");
            } else {
              alert("Please Login");
            }
          }}
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
