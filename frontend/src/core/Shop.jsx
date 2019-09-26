import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ProductItem from "./ProductItem";
import { getCategories } from "./core_util";
import CheckBox from "./CheckBox";
import { prices } from "./fixedPrices";
import PriceButtons from "./PriceButtons";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });

  const loadCategories = () => {
    getCategories().then(categories => {
      if (categories.error) {
        setError(categories.error);
      } else {
        setCategories(categories);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
  };

  const handlePrice = value => {
    const priceRanges = prices;
    let priceArray = [];
    priceRanges.forEach(priceItem => {
      if (priceItem._id === parseInt(value)) {
        //each price has an ID 0-3, check to see if it matches index of the radio
        //button, as passed in PriceButtons.jsx
        priceArray = priceItem.array;
        //if they match, append the array from that priceItem to the priceArray
      }
    });
    return priceArray;
  };

  return (
    <Layout
      title="Home Page"
      description="This is the Shop Component"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter Products By Category:</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter Products By Price:</h4>
          <div>
            <PriceButtons
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">right</div>
        {JSON.stringify(myFilters)}
      </div>
    </Layout>
  );
};

export default Shop;
