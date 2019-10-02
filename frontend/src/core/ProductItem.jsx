import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
const ProductItem = ({ product }) => {
  product.description = product.description || "   ";
  return (
    <div
      className="card card text-white "
      // style={{ background: "whitesmoke" }}
    >
      <div className="card-header "> {product.name}</div>
      <div className="card-body">
        <ProductPhoto item={product} url="product" key={product._id} />
        {/* <p>{product.description.slice(0, 50)}... || product.price</p> */}
        <p className="black-9">${product.price}</p>
        <Link to={`/product/${product._id}`}>
          <button
            className="btn btn-light mt-2 mb-2 mr-5"
            style={{ background: "#8E0E00", border: "none", color: "white" }}
          >
            Take a Closer Look
          </button>
          <button className="btn btn-success mt-2 mb-2">Add to Cart</button>
        </Link>
      </div>
      {/* <footer className="blockquote"></footer>
      <div className="card-footer"></div> */}
    </div>
  );
};

export default ProductItem;
