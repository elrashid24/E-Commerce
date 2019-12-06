import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then(products => {
      if (products.error) {
      } else {
        setProducts(products);
      }
    });
  };
  const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Layout description="Manage products on your site">
      <div className="row">
        <div className="row">
          <ul className="list-group ml-4">
            {products.map((p, i) => {
              return (
                <li className="list-group-item" key={i}>
                  <strong className="mr-4">{p.name}</strong>
                  <button
                    className="badge badge-danger badge-pill"
                    onClick={() => destroy(p._id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>{" "}
      </div>{" "}
    </Layout>
  );
};

export default ManageProducts;
