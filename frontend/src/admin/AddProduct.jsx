import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
import { createProduct } from "./admin_api_util";
import { getCategories } from "../search/search_api_util";
import { create } from "domain";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    error: "",
    createdProduct: "",
    redreictToProfile: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    categories,
    quantity,
    error,
    createdProduct,
    formData
  } = values;

  const handleOnChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const loadProductInfo = () => {
    getCategories().then(allCategories => {
      if (allCategories.error) {
        setValues({ ...values, error: allCategories.error });
      } else {
        setValues({
          ...values,
          categories: allCategories,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => loadProductInfo(), []);

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(newProduct => {
      if (newProduct.error) {
        setValues({ ...values, error: newProduct.error });
      } else {
        setValues({
          name: "",
          description: "",
          price: "",
          categories: [],
          category: "",
          shipping: "",
          quantity: "",
          photo: "",
          loading: false,
          createdProduct: newProduct
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

  const showSuccess = () => {
    return (
      <div
        className="alert text-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        Your product has been successfully created!
      </div>
    );
  };

  const newProductForm = () => (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleOnChange("photo")}
          />
          Photo Image
        </label>
      </div>
      <div>
        <label className="text-muted">Product Name</label>
        <input
          className="form-control"
          onChange={handleOnChange("name")}
          type="text"
          value={name}
        />
      </div>
      <div>
        <label className="text-muted">Product Description</label>
        <textarea
          className="form-control"
          onChange={handleOnChange("description")}
          value={description}
        ></textarea>
      </div>
      <div>
        <label className="text-muted">Price</label>
        <input
          className="form-control"
          onChange={handleOnChange("price")}
          type="text"
          value={price}
        />
      </div>
      <div>
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleOnChange("category")}>
          {categories &&
            categories.map((category, idx) => {
              return (
                <option key={idx} value={category._id}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <label className="text-muted">Quantity</label>
        <input
          className="form-control"
          onChange={handleOnChange("quantity")}
          type="number"
          value={quantity}
        />
      </div>
      <div>
        <label className="text-muted">Will you be needing Shipping?</label>
        <select className="form-control" onChange={handleOnChange("shipping")}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary mb-3 mt-3">
        Create Product
      </button>
      <div> {showSuccess()} </div> <div> {showError()} </div>{" "}
    </form>
  );

  return (
    <Layout
      title="Create a New Category"
      description={`Hi ${user.name}! Let's create a new product.`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2"> {newProductForm()} </div>{" "}
      </div>{" "}
    </Layout>
  );
};
export default AddProduct;
