import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/cartPage";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Product from "./pages/ProductPage";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {

  return (
    <div className="mx-4 sm:mx-[2%]">
      <Analytics />
      <ToastContainer />
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

        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
