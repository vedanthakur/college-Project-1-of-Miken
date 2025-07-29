import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import ShowOrder from "./pages/orders/ShowOrder";
import CreateOrder from "./pages/orders/CreateOrder";
import CreateFood from "./pages/admin/foods/CreateFood";
import ListFoods from "./pages/admin/foods/ListFoods";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminSidebar from "./components/sidebar/AdminSidebar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import LoginPopup from "./components/loginPopup/LoginPopup";
import ListOrdersAdmin from "./pages/admin/orders/ListOrdersAdmin";
import ShowOrderAdmin from "./pages/admin/orders/ShowOrderAdmin";
import ListOrders from "./pages/orders/ListOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const loggedInUserData = localStorage.getItem("currentUser");
      const userRole = JSON.parse(loggedInUserData).role;
      setRole(userRole);
    }
  }, []);

  const url = "http://localhost:4000";

  return (
    <AuthProvider>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {role === "admin" && (
        <>
          <AdminNavbar />
          <hr />
        </>
      )}
      <div className={`app ${role === "admin" ? "admin-content" : ""}`}>
        <ToastContainer />

        {(role === "user" || role === "") && (
          <Navbar setShowLogin={setShowLogin} />
        )}

        {role === "admin" && <AdminSidebar />}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={role === "admin" ? <ListOrdersAdmin url={url} /> : <Home />}
          />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders/create" element={<CreateOrder />} />
            <Route path="/orders" element={<ListOrders url={url} />} />
            <Route path="/orders/:orderId" element={<ShowOrder />} />
          </Route>

          <Route path="/admin/orders/:orderId" element={<ShowOrder />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/admin/foods/create"
              element={<CreateFood url={url} />}
            />
            <Route path="/admin/foods" element={<ListFoods url={url} />} />
            <Route path="/admin/orders" element={<ListOrdersAdmin url={url} />} />
            <Route path="/admin/orders/:orderId" element={<ShowOrderAdmin />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
};
export default App;
