import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [products,setProducts] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [loading,setLoading] = useState(false)
  const [address,setAddress] = useState({})

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/public");
      if (data) {
        setDoctors(data);
        console.log(data)
      } else {

        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProductsData = async () => {

    try {
      
      const {data} = await axios.get(backendUrl + "/api/products")

      if (data){
        setProducts(data)
        console.log(data)
      } else {
        toast.error("Error Fetching Products")
      }

    } catch (error) {
      console.log(error)

    }

  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { 
          Authorization: `Bearer ${token}`
         },
      });
      if (data.success) {
        setUserData(data.user);
        // setAddress(data.user)
        console.log(data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCart = async () => {
    try {

      const {data} = await axios.get(backendUrl + "/api/user/fetch-cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(data)

      if(data){
        setCartItems(data.cartItems)
      } else {
        toast.error("Can't fetch cart")
      }


    } catch (error) {

      console.log(error)
    }
  }

  const value = {
    doctors,
    products,
    loading,
    setLoading,
    getDoctorsData,
    getCart,
    cartItems,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    // getDoctorsData();
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
