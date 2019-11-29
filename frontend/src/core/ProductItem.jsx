import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";
import moment from "moment";
import { addProductToCart, updateItem, removeItem } from "./cartHelperMethods";

const ProductItem = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined
}) => {
  product.description = product.description || "   ";

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <button
          className="btn btn-success mt-2 "
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

  const handleChange = productId => event => {
    console.log("update item", productId);
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      console.log(updateItem(productId, event.target.value));
    }
  };
  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-success " value={count}>
          Add to cart
        </button>
      )
    );
  };
  const showRemoveProductBtn = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-danger "
        >
          Remove Item From Cart
        </button>
      )
    );
  };

  const addToCart = () => {
    addProductToCart(product, () => {
      setRedirect(true);
    });
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Quantity</span>
          </div>
          <input
            onChange={handleChange(product._id)}
            className="form-control"
            type="number"
            value={count}
          />
        </div>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header "> {product.name}</div>
      <div className="card-body">
        {redirectToCartPage(redirect)}
        <Link to={`/product/${product._id}`}>
          <ProductPhoto item={product} url="product" key={product._id} />
        </Link>
        <p className="lead mt-2">{product.description.slice(0, 80)}...</p>
        <p className="black-9">Price: ${product.price}</p>
        <p className="black-8">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added {moment(product.createdAt).fromNow()} {showStockButton(product)}
        </p>
        {showAddToCartBtn(showAddToCartButton)}
        <Link to={`/product/${product._id}`}>
          {showViewButton(showViewProductButton)}
        </Link>
        {showCartUpdateOptions(cartUpdate)}
        {showRemoveProductBtn(showRemoveProductButton)}
      </div>
    </div>
  );
};

export default ProductItem;
