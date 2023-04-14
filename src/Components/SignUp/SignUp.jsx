import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
const auth = getAuth(app);
const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleRegister = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("please contain at least one upper case  on your password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        setSuccess("User created successfully");
        sendEmailVerify(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
    const sendEmailVerify = (user) => {
      sendEmailVerification(user).then((result) => {
        console.log(result);
      });
      alert("please verify your email address");
    };
  };
  return (
    <div>
      <h2>Sign Up Here</h2>
      <form onSubmit={handleRegister}>
        <input type="email" name="email" id="" />
        <input type="password" name="password" id="" />
        <input type="submit" value="Register" />
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
        <p>
          Already have a account <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
