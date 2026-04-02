import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [orders, setOrders] = useState([])
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [products,setProducts] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/doctors",
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data) {
        setDoctors(data);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
        console.log(data)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  };

  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(
        backendUrl + "/api/products"
      );

      if (data) {
        setProducts(data)
        console.log(data)
      } else {
        toast.error("Can't Fetch Products")
      }
    } catch (error) {
      toast.error("Error Fetching Products")
      console.log(error)
    }
  }

  const getAllOrders = async () => {

    try {
       const { data } = await axios.get(backendUrl + `/api/admin/orders`,{headers: {Authorization: `Bearer ${aToken}`}})

       if (data) {
        setOrders(data.orders)
        console.log("ORDER DATA: ",data)
       } else {
        toast.error("Couldn't fetch orders")
       }
    } catch (error) {

      console.log(error)

    }
  }

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      console.log(data)

      if (data) {
        setAppointments(data);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      console.log(data)

      if (data) {
        setDashData(data);
        console.log(data.dashData);
      } else {
        console.log(data)
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    products,
    getAllDoctors,
    changeAvailability,
    getAllProducts,
    appointments,
    setAppointments,
    getAllOrders,
    orders,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
