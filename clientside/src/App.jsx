import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";

import { fetchCart } from "./lib/features/cart/cartSlice";

/* CLIENT PAGES */
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Cart from "./pages/cartPage";
import Appointment from "./pages/Appointment";
import Product from "./pages/ProductPage";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import VerifyEmail from "./pages/VerifyEmail";

/* CLIENT COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* ADMIN */
import Sidebar from "./components/adminComponents/Sidebar";
import AdminNavbar from "./components/adminComponents/Navbar";

import Dashboard from "./pages/adminPages/Dashboard";
import AllAppointments from "./pages/adminPages/AllAppointments";
import AddDoctor from "./pages/adminPages/AddDoctor";
import DoctorsList from "./pages/adminPages/DoctorsList";
import AddProduct from "./pages/adminPages/AddProduct";
import ProductsList from "./pages/adminPages/ProductsList";
import AdminOrders from "./pages/adminPages/Orders";

/* DOCTOR */
import DoctorDashboard from "./pages/doctorPages/DoctorDashboard";
import DoctorAppointments from "./pages/doctorPages/DoctorAppointments";
import DoctorProfile from "./pages/doctorPages/DoctorProfile";
import { AppContext } from "./context/AppContext";

const App = () => {
  const dispatch = useDispatch();

  const {user,loading} = useContext(AppContext)


  if (loading) return null;
 
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return (
    <>
      <Analytics />
      <ToastContainer />

      <Routes>

        {/* CLIENT ROUTES */}
        <Route
          path="/*"
          element={
            <div className="mx-4 sm:mx-[2%]">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:type" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify/verify-email" element={<VerifyEmail />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
                <Route path="/cart" element={<Cart />} />

                <Route element={<ProtectedRoute user={user} />}>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                  <Route path="/my-appointments" element={<MyAppointments />} />
                </Route>
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* ADMIN ROUTES */}
        {user?.role === "admin" && (
          <Route
            path="/admin/*"
            element={
              <div className="bg-[#F8F9FD]">
                <AdminNavbar />
                <div className="flex items-start">
                  <Sidebar />
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="appointments" element={<AllAppointments />} />
                    <Route path="add-doctor" element={<AddDoctor />} />
                    <Route path="doctor-list" element={<DoctorsList />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="product-list" element={<ProductsList />} />
                    <Route path="orders" element={<AdminOrders />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}

        {/* DOCTOR ROUTES */}
        {user?.role === "doctor" && (
          <Route
            path="/doctor/*"
            element={
              <div className="bg-[#F8F9FD]">
                <AdminNavbar />
                <div className="flex items-start">
                  <Sidebar />
                  <Routes>
                    <Route path="dashboard" element={<DoctorDashboard />} />
                    <Route path="appointments" element={<DoctorAppointments />} />
                    <Route path="profile" element={<DoctorProfile />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}

      </Routes>
    </>
  );
};

export default App;