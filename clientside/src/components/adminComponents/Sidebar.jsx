import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { user } = useContext(AppContext);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
    }`;

  return (
    <div className="min-h-screen bg-white border-r">
      
      {/* ADMIN SIDEBAR */}
      {user?.role === "admin" && (
        <ul className="text-[#515151] mt-5">

          <NavLink className={linkClass} to="/admin/appointments">
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={linkClass} to="/admin/add-doctor">
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink className={linkClass} to="/admin/add-product">
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Product</p>
          </NavLink>

          <NavLink className={linkClass} to="/admin/orders">
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Orders</p>
          </NavLink>

          <NavLink className={linkClass} to="/admin/doctor-list">
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>

          <NavLink className={linkClass} to="/admin/product-list">
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Products List</p>
          </NavLink>

        </ul>
      )}

      {/* DOCTOR SIDEBAR */}
      {user?.role === "doctor" && (
        <ul className="text-[#515151] mt-5">

          <NavLink className={linkClass} to="/doctor/appointments">
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor/profile">
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>

        </ul>
      )}
    </div>
  );
};

export default Sidebar;