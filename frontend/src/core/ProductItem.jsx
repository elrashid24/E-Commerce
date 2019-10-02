import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
import moment from "moment";

const ProductItem = ({ product, showViewProductButton = true }) => {
  product.description = product.description || "   ";
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <button
          className="btn btn-light mt-2 mb-2 mr-5"
          style={{ background: "#8E0E00", border: "none", color: "white" }}
        >
          Take a Closer Look
        </button>
      )
    );
  };

  const showStockButton = product => {
    return product.quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };
  return (
    <div className="card card text-white ">
      <div className="card-header "> {product.name}</div>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <ProductPhoto item={product} url="product" key={product._id} />
        </Link>
        <p className="lead mt-2">{product.description.slice(0, 100)}...</p>
        <p className="black-9">Price: ${product.price}</p>
        <p className="black-8">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added {moment(product.createdAt).fromNow()} {showStockButton(product)}
        </p>
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-success mt-2 mb-2 mr-3">
            Add to Cart
          </button>
          {showViewButton(showViewProductButton)}
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
