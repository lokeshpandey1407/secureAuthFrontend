import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthorised = JSON.parse(localStorage.getItem("user_token"));

  const navigate = useNavigate();

  //Signout function to handle signout functionality
  const handleSignout = () => {
    localStorage.removeItem("user_token");
    navigate("/signin");
  };
  return (
    <div className={styles.navbar}>
      <h3>SecureAuth</h3>
      {isAuthorised && (
        <button onClick={handleSignout} className={styles.logoutBtn}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
