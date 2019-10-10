import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth_api";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="btn btn-success">Checkout</div>
    ) : (
      <Link to="/signin">
        <button className="btn-primary">Sign in to checkout these items</button>
      </Link>
    );
  };
  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
