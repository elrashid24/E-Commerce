import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

//components
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";

//routes
import PrivateRoutes from "./auth_api/ProtectedRoutes";
import AdminRoutes from "./auth_api/AdminRoutes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <AdminRoutes path="/create/category" exact component={AddCategory} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
