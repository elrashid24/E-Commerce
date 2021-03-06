import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import Layout from "./Layout";
import { getCart } from "./cartHelperMethods";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => {
          return (
            <ProductItem
              key={i}
              product={product}
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          );
        })}
      </div>
    );
  };
  const noItemsInCart = () => {
    return (
      <h2>
        Your cart is empty <hr />
        <Link to="/shop">Start Shopping</Link>
      </h2>
    );
  };
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsInCart()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <Checkout products={items} setRun={setRun} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
