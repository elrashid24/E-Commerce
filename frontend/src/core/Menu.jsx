import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth_api/index";

const Menu = ({ history }) => {
  const activeLink = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "red" };
    }
    return { color: "white" };
  };
  return (
    <div>
      <div>
        <ul className="navbar">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={activeLink(history, "/")}>
              Home
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="user/dashboard"
                style={activeLink(history, "/user/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard"
                style={activeLink(history, "/admin/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <React.Fragment>
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
            </React.Fragment>
          )}

          {isAuthenticated() && (
            <span>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() =>
                    signOut(() => {
                      history.push("/");
                    })
                  }
                >
                  Sign Out
                </Link>
              </li>
            </span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
