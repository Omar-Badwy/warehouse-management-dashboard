import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={ <Dashboard /> }
      />

      <Route
        path="/products"
        element={ <Products /> }
      />

      <Route
        path="/categories"
        element={ <Categories /> }
      />

      <Route
        path="/customers"
        element={ <Customers /> }
      />

      <Route
        path="/orders"
        element={ <Orders /> }
      />
      
      <Route
        path="/Settings"
        element={ <Settings /> }
      />

    </Routes>
  );
}

export default AppRoutes;