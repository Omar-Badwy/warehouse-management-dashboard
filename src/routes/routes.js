import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Products from "../pages/products";
import Categories from "../pages/categories";
import Orders from "../pages/orders";
import Settings from "../pages/settings";

import ProtectedRoute from "./protectedRoute";
import DashboardLayout from "../dashboardLayout";
import CategoryProductsPage from "../pages/categoryProductsPage";
import Clients from "../pages/clients";
import ClientPage from "../pages/clientPage";
import ErrorPage from "../pages/errorPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>
        }>

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="categories/:categoryId"
            element={
                <ProtectedRoute>
                    <CategoryProductsPage />
                </ProtectedRoute>
            }
          />

          <Route
            path="clients"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />

          <Route
            path="clients/:clientId"
            element={
                <ProtectedRoute>
                    <ClientPage />
                </ProtectedRoute>
            }
          />

          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="error"
            element={
              <ProtectedRoute>
                <ErrorPage />
              </ProtectedRoute>
            }
          />
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;