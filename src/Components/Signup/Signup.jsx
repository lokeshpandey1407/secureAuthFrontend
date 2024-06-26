import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

const Signup = () => {
  const [userInfo, setuserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //Handler function to change the input field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => {
      return { ...prev, [name]: value.trim() };
    });
  };

  //Function to check if the userName is already present in the database or not
  const checkValidUserName = async (userName) => {
    if (!userName || userName.trim() === "") {
      return;
    }
    await fetch(
      "https://secureauthbackend.onrender.com/api/auth/checkUserName",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.data.isPresent) {
          toast.error("Username is already registered");
        }
      });
  };

  //Function to check if the email is already present in the database or not
  const checkValidEmail = async (email) => {
    if (!email || email.trim() === "") {
      return;
    }
    await fetch("https://secureauthbackend.onrender.com/api/auth/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.isPresent) {
          toast.error("Email is already registered");
        }
      });
  };

  //Signup handler function
  const handleSignup = async (e) => {
    e.preventDefault();

    //empty username error handler
    if (userInfo.userName === "" || userInfo.userName === null) {
      toast.error("Username cannot be empty");
      return;
    }
    //empty email error handler
    if (userInfo.email === "" || userInfo.email === null) {
      toast.error("Email cannot be empty");
      return;
    }

    //valid email error handler
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userInfo.email)) {
      toast.error("Invalid Email");
      return;
    }

    //empty password error handler
    if (userInfo.password === "" || userInfo.password === null) {
      toast.error("password cannot be empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://secureauthbackend.onrender.com/api/auth/signup",
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
          navigate("/signin");
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
    <div className={styles.signupContainer}>
      <div className={styles.signupFormContainer}>
        <form className={styles.signupForm}>
          <h2>Sign up here...</h2>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="username"
              name="userName"
              value={userInfo.userName}
              placeholder="Enter your Username"
              onChange={handleInputChange}
              onBlur={() => checkValidUserName(userInfo.userName)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              placeholder="Enter your Email"
              onChange={handleInputChange}
              required
              onBlur={() => checkValidEmail(userInfo.email)}
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
              required
            />
          </div>
          <button type="submit" onClick={handleSignup} disabled={isLoading}>
            {isLoading ? <Loader /> : "Signup"}
          </button>
          <p className={styles.formFooterText}>
            Already have an account ? <Link to={"/signin"}>Click here</Link>
          </p>
        </form>
      </div>
      <div className={styles.heroSection}>
        <h1>Secure User Authentication</h1>
        <p>
          JWT (JSON Web Token) is a compact, URL-safe token format used for
          securely transmitting information between parties, often for
          authentication and authorization.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
