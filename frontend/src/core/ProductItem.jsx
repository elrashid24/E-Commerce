import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
import moment from "moment";
import { addProductToCart } from "./cardHelperMethods";

const ProductItem = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true
}) => {
  product.description = product.description || "   ";

  const [redirect, setRedirect] = useState(false);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <button
          className="btn btn-success mt-2 mb-2 mr-5"
          style={{
            background: "#8e0e00"
          }}
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
      <span className="badge badge-warning badge-pill">Out of Stock</span>
    );
  };

  const redirectToCartPage = redirect => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };
  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-success mt-2 mb-2 mr-5">
          Add to cart
        </button>
      )
    );
  };

  const addToCart = () => {
    addProductToCart(product, () => {
      setRedirect(true);
    });
  };
  return (
    <div className="card card text-white ">
      <div className="card-header "> {product.name}</div>
      <div className="card-body">
        {redirectToCartPage(redirect)}
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
        <div className="bottom-container">
          {showAddToCartBtn(showAddToCartButton)}
          <Link to={`/product/${product._id}`}>
            {showViewButton(showViewProductButton)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
