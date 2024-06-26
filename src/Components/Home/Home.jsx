import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user_token"));

  //Decoding token to fetch token payload
  function decodeToken() {
    if (token) {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = atob(base64);
      return JSON.parse(decoded);
    }
  }

  //use Effect function to check if the token is present or not,
  //if not present then user will be navigated to signin page
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    const payload = decodeToken();
    setUserInfo(payload);
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>{`Hello ${userInfo.userName} !`}</h1>
      <p>We're glad to see you here.</p>
      <span>
        Your Email is{" "}
        <span>
          <b>{` ${userInfo.email}`}</b>
        </span>
      </span>
    </div>
  );
};

export default Home;
