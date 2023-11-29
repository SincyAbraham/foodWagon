import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



// ---------------------   COMMON PAGES
import Home from "./pages/Common/Main";
import Login from "./pages/Common/Login";
import Register from "./pages/Common/Register";
import NoPage from "./pages/Common/NoPage";
import ProductDetails from "./pages/Common/ProductDetails";
import Products from "./pages/Common/Products";
import Cart from "./pages/Common/Cart";
import Checkout from "./pages/Common/Checkout";
import Thanks from "./pages/Common/Thanks";

// ---------------------   ADMIN PAGES
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminCatgeory from "./pages/Admin/Category";
import AdminFoods from "./pages/Admin/Foods";
import AdminOrders from "./pages/Admin/Orders";
import AdminProfie from "./pages/Admin/Profile";
import AdminOrderDetails from "./pages/Admin/OrderDetails";

// ---------------------   USER PAGES
import Dashboard from "./pages/User/Dashboard";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import OrdersDetails from "./pages/User/OrdersDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />}></Route> 

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/categories" element={<AdminCatgeory />} />
          <Route path="/admin/foods" element={<AdminFoods />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/profile" element={<AdminProfie />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />


          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks/:id" element={<Thanks />} />

          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/user/orders/:id" element={<OrdersDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
