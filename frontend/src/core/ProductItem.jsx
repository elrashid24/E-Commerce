import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
const ProductItem = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div
        className="card card text-white "
        // style={{ background: "whitesmoke" }}
      >
        <div className="card-header "> {product.name}</div>
        <div className="card-body">
          <ProductPhoto item={product} url="product" key={product._id} />
          <p>{product.description.slice(0,50)}...</p>
          <p>${product.price}</p>
          <Link to="/">
            <button
              className="btn btn-light mt-2 mb-2 mr-5"
              style={{ background: "#8E0E00", border: "none", color: "white" }}
            >
              Take a Closer Look
            </button>
            <button className="btn btn-success mt-2 mb-2">Add to Cart</button>
          </Link>
        </div>
      </div>
      <div className="card-footer">
        <footer class="blockquote">
          <cite title="Source Title"></cite>
        </footer>
      </div>
    </div>
  );
};

export default ProductItem;
