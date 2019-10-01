import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getCategories, list } from "./core_util";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(loadedCategories => {
      if (loadCategories.error) {
        console.log("ERROR IN LOADING CATEGORIES", loadCategories.error);
      } else {
        setData({ ...data, categories: loadedCategories });
      }
    });
  };

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };
  const handleSubmit = e => {
    e.preventDefault();
    searchForProducts();
  };

  const searchForProducts = () => {
    if (search) {
      console.log(search);
      return list({ search: search || undefined, category: category }).then(
        // response => {
        //   if (response.error) {
        //     console.log("error in search", response.error);
        //   } else {
        //     console.log("coming from the backend", response);
        //     setData({ ...data, results: response, searched: true });
        //   }
        // }
        res => {
          console.log("RES", res);
        }
      );
    }
  };

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <span className="input-group-text mb-3">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">Search by category</option>
                {categories.map((category, idx) => {
                  return (
                    <option key={idx} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              placeholder="Search by name"
              onChange={handleChange("search")}
            />
          </div>
          <div className="btn btn-group-append">
            <button className="input group text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);
  return <div>{searchForm()}</div>;
};
export default Search;