import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signIn } from "../auth_api/index";
import { authenticate } from "../auth_api/index";
const Signin = () => {
  const [values, setValues] = useState({
    email: "demo@gmail.com",
    password: "demodemo22",
    error: "",
    loading: false,
    redirectToRefferer: false
  });

  const { email, password, loading, error, redirectToRefferer } = values;

  const handleChange = field => event => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const handleSignin = e => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then(res => {
      if (res.error) {
        setValues({ ...values, error: res.error, loading: false });
      } else {
        authenticate(res, () => {
          setValues({
            ...values,
            redirectToRefferer: true
          });
        });
      }
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

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToRefferer) {
      return <Redirect to="/" />;
    }
  };

  const signUpForm = () => {
    return (
      <form className="container col-md-8 offset-md-2">
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSignin}>
          Sign in!
        </button>
      </form>
    );
  };

  return (
    <div>
      <Layout title="Signin Page" description="this is the sign up page" />
      {showLoading()}
      {showError()}, {redirectUser()}
      {signUpForm()}
    </div>
  );
};
export default Signin;
