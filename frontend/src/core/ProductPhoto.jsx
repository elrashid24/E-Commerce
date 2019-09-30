import React from "react";

const ProductPhoto = ({ item, url }) => {
  console.log(item);
  return (
    <div className="product-photo">
      <img
        className="mb-4"
        src={`http://localhost:8000/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      ></img>
    </div>
  );
};

export default ProductPhoto;
