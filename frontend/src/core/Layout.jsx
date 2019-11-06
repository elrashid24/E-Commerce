import React from "react";
import "../styles.css";

const Layout = ({ className, children }) => {
  return (
    <div className="app-container">
      <div className="jumbotron  mx-2 mb-5 "></div>
      <div className="home-pics-container">
        <img
          className="jumbo-pic1"
          src={require("./hoops-jumbo.jpeg")}
          alt=""
        />

        <img
          className="jumbo-pic2"
          src={require("./hoops-jumbo.jpeg")}
          alt=""
        />
        <img
          className="jumbo-pic3"
          src={require("./girl-hoops.jpg")}
          alt=""
        />
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
