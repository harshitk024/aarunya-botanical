import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Cart from "./pages/cartPage";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Product from "./pages/ProductPage"
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { ToastContainer, toast } from "react-toastify";
import Orders from "./pages/Orders";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchCart } from "./lib/features/cart/cartSlice";
import VerifyEmail from "./pages/VerifyEmail";
import { AppContext } from "./context/AppContext";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(fetchCart())
    }
  },[dispatch])




  return (
    <div className="mx-4 sm:mx-[2%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/products" element = {<Products />} />
        <Route path="/products/:type" element = {<Products />} />
        <Route path="/cart" element={<Cart /> } />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/verify/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
