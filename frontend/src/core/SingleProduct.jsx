import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getSingleProduct } from "./core_util";
import ProductItem from "./ProductItem";
const SingleProduct = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  const loadSingleProduct = productId => {
    getSingleProduct(productId).then(product => {
      if (product.error) {
        setError(product.error);
      } else {
        setProduct(product);
      }
    });
  };

  return (
    <Layout
      title={product.name}
      description={product.description || product.price}
      className="container-fluid"
    >
      <ProductItem
        key={product._id}
        product={product}
        showViewProductButton={false}
      />
    </Layout>
  );
};
export default SingleProduct;
