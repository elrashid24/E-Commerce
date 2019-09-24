import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [succes, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleOnChange = e => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted"></label>
        <input
          type="text"
          onChange={handleOnChange}
          value={name}
          className="form-control mb-5"
          autoFocus
          
        />
        <button className="btn btn-outline-primary">Create Category</button>
      </div>
    </form>
  );

  return (
    <Layout
      title="Create a New Category"
      description={`Hi ${user.name}! Let's create a new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
