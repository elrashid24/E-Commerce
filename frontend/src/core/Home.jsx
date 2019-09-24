import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./core_util";
import ProductItem from "./product_item";
const Home = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySold = () => {
    getProducts(`sold`).then(productsSortedBySold => {
      if (productsSortedBySold.error) {
        setError(productsSortedBySold.error);
      } else {
        setProductsBySold(productsSortedBySold);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts(`createdAt`).then(productsSortedByArrival => {
      if (productsSortedByArrival.error) {
        setError(productsSortedByArrival.error);
      } else {
        setProductsByArrival(productsSortedByArrival);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);
  return (
    <Layout title="My Project" description="Home">
      <h2 className="mb-4">Popular Products</h2>

      {productsBySold.map((product, idx) => {
        return <ProductItem key={idx} product={product} />;
      })}
    </Layout>
  );
};
export default Home;
