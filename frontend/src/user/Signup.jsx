import React, { useState } from "react";
import Layout from "../core/Layout";
// const postHeaders = {
//   Accept: "application/json",
//   "Content Type": "application/json"
// };
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password } = values;
  const handleChange = field => event => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const signUp = user => {
    fetch(`http://localhost:8000/signup`, {
      method: `POST`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // console.log(name, email, password);
  };

  const handleSignup = e => {
    e.preventDefault();
    signUp({ name, email, password });
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
      {signUpForm()}
    </div>
  );
};
export default Signup;
