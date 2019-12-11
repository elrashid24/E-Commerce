import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth_api";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder
} from "./core_util";
import "braintree-web";
import Dropin from "braintree-web-drop-in-react";
import { set } from "mongoose";
import { emptyCart } from "./cartHelperMethods";

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
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
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  const handleAdress = event => {
    setData({ ...data, address: event.target.value });
  };

  const showDropin = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken && products.length > 0 ? (
          <div>
            <div className="gorm group mb-3">
              <label className="text-muted">Delivery Address:</label>
              <textarea
                onChange={handleAdress}
                value={data.address}
                placeholder="Where would you like your order to be shipped?"
                className="form-control"
              ></textarea>
            </div>
            <Dropin
              options={{ authorization: data.clientToken }}
              onInstance={instance => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success">
              Checkout
            </button>
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

  const buy = () => {
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then(paymentMethodData => {
        nonce = paymentMethodData.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };
        processPayment(userId, token, paymentData)
          .then(res => {
            console.log(res);
            const createOrderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
              address: data.address
            };
            createOrder(userId, token, createOrderData);
            setData({ ...data, success: res.success });
            emptyCart(() => {
              console.log("cart was emptied and shit");
              setRun(!run);
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        setData({ ...data, error: error.message });
      });
  };

  const showError = error => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? " " : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSucces = success => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? " " : "none" }}
      >
        Thanks for shopping! Your payment was sucessfully processed.
      </div>
    );
  };
  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSucces(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
