import React from "react";
import "../styles.css";
import Search from "./Search";

const Layout = ({ children, description = "Description" }) => {
  return (
    <div>
      <div className="jumbotron">{description}</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
