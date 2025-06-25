import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

function App() {
  const { setUser, user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [firebase, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route path="/view" element={user ? <View /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
