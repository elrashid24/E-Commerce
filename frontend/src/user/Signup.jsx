import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = field => event => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const signUp = user => {
    return fetch(`http://localhost:8000/signup`, {
      method: `POST`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        setValues({ ...values, success: true, error: false });
        return response.json();
      })
      .catch(err => console.log(err));
  };

  const handleSignup = e => {
    e.preventDefault();
    signUp({ name, email, password }).then(res => {
      if (res.error) {
        setValues({ ...values, error: res.error, success: false });
      }
      console.log(values);
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Your account has been successfully created!{" "}
        <Link to="/signin">Please Sign in </Link>to start using V-Commerce.
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <form className="container col-md-8 offset-md-2">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSignup}>
          Sign up Now!
        </button>
      </form>
    );
  };

  return (
    <div>
      <Layout title="Signup Page" description="this is the sign up page" />
      {showError()},{showSuccess()}
      {signUpForm()}
    </div>
  );
};
export default Signup;
