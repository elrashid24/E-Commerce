import React from "react";
import "../styles.css";
import Search from "./Search";

const Layout = ({
  className,
  children,
  description = "Description",
  title = "Title"
}) => {
  return (
    <div>
      <div className="jumbotron">{description}</div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
