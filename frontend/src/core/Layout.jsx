import React from "react";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "description",
  className,
  children
}) => {
  return (
    <div className="app-container">
      <div className="jumbotron text-center  mx-2 mb-5 ">
        {/* <h2 className="card-title h2">{title}</h2> */}
        {/* <p className="lead">{description}</p> */}
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
