import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./core_util";
import ProductItem from "./ProductItem";
import Search from "./Search";

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
    return getProducts(`createdAt`).then(productsSortedByArrival => {
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
    <Layout title="My Project" description="Home" className="container-fluid">
      <Search />
      <h2 className="mb-4">Latest Products</h2>
      <div className="row">
        {productsByArrival.map((product, idx) => {
          return (
            <div className="col-4 mb-3" key={idx}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
      <br />
      <h2 className="mb-4">Popular Products</h2>
      <div className="row">
        {productsBySold.map((product, idx) => {
          return (
            <div className="col-4 mb-3" key={idx}>
              <ProductItem product={product} />;
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default Home;
