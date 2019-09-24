import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
import { createCategory } from "./admin_api_util";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [succes, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  // console.log(user);
  const handleOnChange = e => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then(newCategory => {
      //   console.log(newCategory.error.message);
      if (newCategory.error) {
        setError(newCategory.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showSuccess = () => {
    if (succes) {
      return (
        <h3 className="text-success">
          Congrats! A {name} category has been created.
        </h3>
      );
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category names should be unique.</h3>;
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted"></label>
        <input
          type="text"
          onChange={handleOnChange}
          value={name}
          className="form-control "
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <Layout
      title="Create a New Category"
      description={`Hi ${user.name}! Let's create a new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
        <div>{showSuccess()}</div>
        <div>{showError()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
