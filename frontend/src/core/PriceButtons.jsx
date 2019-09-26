import React, { useState, useEffect, Fragment } from "react";

const PriceButton = ({ prices, handleFilters }) => {
  const [value, setValues] = useState(0);

  const handleChange = e => {
    handleFilters(e.target.value);
    setValues(e.target.value);
  };
  return prices.map((price, i) => {
    return (
      <div key={i}>
        <input
          type="radio"
          onChange={handleChange}
          value={`${price._id}`}
          className="mr-2 ml-4"
          name={price}
        />
        <label className="form-check-label">{price.name}</label>
      </div>
    );
  });
};

export default PriceButton;
