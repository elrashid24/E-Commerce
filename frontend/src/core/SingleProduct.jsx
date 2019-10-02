import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getSingleProduct, listRelatedProducts, list } from "./core_util";
import ProductItem from "./ProductItem";
const SingleProduct = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  const loadSingleProduct = productId => {
    getSingleProduct(productId).then(product => {
      if (product.error) {
        setError(product.error);
      } else {
        setProduct(product);
      }
    });

    listRelatedProducts(productId).then(relatedProducts => {
      if (relatedProducts.error) {
        console.log("ERROR", relatedProducts.error);
        setError(relatedProducts.error);
      } else {
        setRelatedProducts(relatedProducts);
      }
    });
  };

  return (
    <Layout
      title={product.name}
      description={product.description || product.price}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <ProductItem
              product={product}
              key={product._id}
              showViewProductButton={false}
            />
          )}
        </div>
        <div className="col-4">
          <h3 className="ml-5">Related Products</h3>
          {relatedProducts.map((product, idx) => {
            return (
              <div className="mr-3">
                <ProductItem
                  product={product}
                  key={idx}
                  showViewProductButton={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default SingleProduct;
