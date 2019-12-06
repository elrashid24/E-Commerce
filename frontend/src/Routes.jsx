import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

//components
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Menu from "./core/Menu";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import SingleProduct from "./core/SingleProduct";
import Cart from "./core/Cart";
import ManageProducts from "./admin/ManageProducts";
//routes
import PrivateRoutes from "./auth_api/ProtectedRoutes";
import AdminRoutes from "./auth_api/AdminRoutes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/shop" exact component={Shop}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/cart" exact component={Cart}></Route>

        <Route
          path="/product/:productId"
          exact
          component={SingleProduct}
        ></Route>

        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />

        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoutes path="/create/category" exact component={AddCategory} />
        <AdminRoutes path="/create/product" exact component={AddProduct} />
        <AdminRoutes path="/admin/products" exact component={ManageProducts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
