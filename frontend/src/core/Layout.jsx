import React from "react";
import "../styles.css";
import Search from "./Search";

const Layout = ({ className, children, description = "Description" }) => {
  console.log(children);
  return (
    <div>
      <Search />
      <div className="app-container">
        <div className="jumbotron">{description}</div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
