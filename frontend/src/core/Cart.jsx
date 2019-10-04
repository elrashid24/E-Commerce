import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import Layout from "./Layout";
import { getCart } from "./cartHelperMethods";

const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getCart());
  }, []);

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
          <p>show checkout options/shipping adress/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
