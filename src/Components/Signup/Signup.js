import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Use at least 6 characters");
      valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Use a 10-digit number");
      valid = false;
    }

    if (valid) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase.firestore().collection("users").add({
              id: result.user.uid,
              username: username,
              phone: phone,
            }).then(() => {
              navigate("/login");
            });
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="signupPageWrapper">
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {emailError && <div className="error">{emailError}</div>}

          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {phoneError && <div className="error">{phoneError}</div>}

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {passwordError && <div className="error">{passwordError}</div>}

          <button type="submit">Signup</button>
        </form>
        <a onClick={() => navigate("/login")}>Login</a>
      </div>
    </div>
  );
}
