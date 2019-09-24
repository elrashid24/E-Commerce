import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api/index";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Navigate</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" style={{ color: "black", cursor: "pointer" }}>
              View My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/profile/update"
              style={{ color: "black", cursor: "pointer" }}
            >
              Edit My Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
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

  const purchaseHistory = () => {
    return (
      <div className="card mb-3">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">Purchases</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout title="Dashboard" description={`Welcome Back, ${name}!`} className="container-fluid">
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()} {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
