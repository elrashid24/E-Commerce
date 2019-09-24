import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
import { createProduct } from "./admin_api_util";
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
    loading: false,
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
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redreictToProfile,
    formData
  } = values;

  const handleOnChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    for (const value of formData.values()) {
      console.log(value);
    }

    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.group(formData.entries());
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(newProduct => {
      console.log(newProduct.error);
      if (newProduct.error) {
        setValues({ ...values, error: newProduct.eror });
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

  useEffect(() => {
    console.log(formData);
    setValues({ ...values, formData: new FormData() });
  }, []);

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
          <option value="5d899f3ec44304bacd546ad3">Option 1</option>
          <option value="5d899f3ec44304bacd546ad3">Option 2</option>
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
        <label className="text-muted">Shipping?</label>
        <select className="form-control" onChange={handleOnChange("shipping")}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  return (
    <Layout
      title="Create a New Category"
      description={`Hi ${user.name}! Let's create a new product.`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2"> {newProductForm()} </div>{" "}
        {/* <div> {showSuccess()} </div> <div> {showError()} </div>{" "} */}
      </div>{" "}
    </Layout>
  );
};
export default AddProduct;
