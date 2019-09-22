import React from "react";
import { Link, withRouter } from "react-router-dom";

const Menu = ({ history }) => {
  const activeLink = (history, path) => {
    console.log(history);
    if (history.location.pathname === path) {
      return { color: "red" };
    }
    return { color: "white" };
  };
  return (
    <div>
      <div>
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={activeLink(history, "/")}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={activeLink(history, "/signin")}
            >
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={activeLink(history, "/signup")}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
