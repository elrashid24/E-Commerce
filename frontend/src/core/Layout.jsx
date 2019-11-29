import React from "react";
import "../styles.css";
import Search from "./Search";

const Layout = ({ className, children }) => {
  return (
    <div>
      <Search />
      {/* <div className="app-container"> */}
      {/* <div className="jumbotron">I Love Basketball</div> */}
      {/* <div className='home-pics-container'>
          <img className="jumbo-pic1" src={require("./ty.png")} alt="" />

          <img
            className="jumbo-pic2"
            src={require("./hoops-jumbo.jpeg")}
            alt=""
          />
          <img className="jumbo-pic3" src={require("./kl.jpeg")} alt="" />
        </div> */}
      <div className={className}>{children}</div>
      {/* </div> */}
    </div>
  );
};

export default Layout;
