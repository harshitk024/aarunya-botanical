import { Route, Routes, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";

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

import { AppContext } from "./context/AppContext";

/* 🔹 Layout Component */
const Layout = () => {
  return (
    <div className="mx-4 sm:mx-[2%]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AppContext);

  /* 🔹 Fetch cart when user logs in */
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  /* 🔹 Prevent blank screen */
  // if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <>
      <Analytics />
      <ToastContainer />

      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:speciality" element={<Doctors />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:type" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="verify/verify-email" element={<VerifyEmail />} />
          <Route path="appointment/:docId" element={<Appointment />} />
          <Route path="cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="orders" element={<Orders />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-appointments" element={<MyAppointments />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;