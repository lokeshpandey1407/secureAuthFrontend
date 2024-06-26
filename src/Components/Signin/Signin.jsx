import React, { useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (userInfo.email === "" || userInfo.email === null) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userInfo.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (userInfo.password === "" || userInfo.password === null) {
      toast.error("password cannot be empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://secureauthbackend.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
      } else {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("user_token", JSON.stringify(data.data));
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_token"));
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className={styles.signinContainer}>
      <div className={styles.heroSection}>
        <h1>Secure User Authentication</h1>
        <p>
          bcrypt is a cryptographic hashing algorithm used for securely hashing
          passwords by incorporating a salt to protect against brute-force
          attacks.
        </p>
      </div>
      <div className={styles.signinFormContainer}>
        <form className={styles.signinForm}>
          <h2>Sign in here...</h2>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              placeholder="Enter your Email"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              placeholder="Enter your Password"
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSignin}>
            {isLoading ? "Signing you in..." : "Signin"}
          </button>
          <p className={styles.formFooterText}>
            Don't have an account? <Link to={"/signup"}>Click here</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
