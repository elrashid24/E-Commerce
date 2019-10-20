import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth_api";
import { getProducts, getBraintreeClientToken } from "./core_util";
import "braintree-web";
import Dropin from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = async (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  const showDropin = () => {
    return (
      <div>
        {data.clientToken && products.length > 0 ? (
          <div>
            <Dropin
              options={{ authorization: data.clientToken }}
              onInstance={instance => (data.instance = instance)}
            />
            <button className="btn btn-success">Checkout</button>
          </div>
        ) : null}
      </div>
    );
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropin()}</div>
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
