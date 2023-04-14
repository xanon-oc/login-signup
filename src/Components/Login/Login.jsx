import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/firebase.config";
const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        setSuccess("Login Successful");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="">
      <h2>Log In Here</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" id="" />
        <input type="password" name="password" id="" />
        <input type="submit" value="LogIn" />
        <p>
          New to our website <Link to="/signUp">Register</Link>
        </p>
      </form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
