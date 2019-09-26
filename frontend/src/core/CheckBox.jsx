import React, { useState } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleCheckedCategories = category => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((category, i) => {
    return (
      <li className="list-unstyled">
        <input
          key={i}
          type="checkbox"
          className="form-check-input"
          onChange={handleCheckedCategories(category._id)}
          value={checked.indexOf(category._id === -1)}
        />
        <label className="form-check-label">{category.name}</label>
      </li>
    );
  });
};

export default CheckBox;
