import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
const ProductItem = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header"> {product.name}</div>
        <div className="card-body">
          <ProductPhoto item={product} url="product" key={product._id} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-5">
              Take a Closer Look
            </button>
            <button className="btn btn-outline-warning mt-2 mb-2">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
