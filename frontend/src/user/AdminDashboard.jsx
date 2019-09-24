import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Navigate</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to="/create/category"
              style={{ color: "black", cursor: "pointer" }}
            >
              Create a Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/create/product"
              style={{ color: "black", cursor: "pointer" }}
            >
              Create a Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Profile Info</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">
            Role:{role === 1 ? "Admin" : "Client"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome Back, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
