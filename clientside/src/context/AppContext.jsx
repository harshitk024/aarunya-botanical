import { createContext, useEffect, useState } from "react";
import api from "../lib/axios"
import { toast } from "react-toastify";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

  const currencySymbol = "₹";

  const [doctors, setDoctors] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user);
    } catch(error) {
      console.log(error)
      setUser(null);
    }
  };


  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    setCartItems([]);
  };


  const getDoctorsData = async () => {
    try {
      const { data } = await api.get("/api/doctor/public");
      setDoctors(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getProductsData = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch {
      toast.error("Error fetching products");
    }
  };

  const getCart = async () => {
    try {
      const { data } = await api.get("/api/user/fetch-cart");
      setCartItems(data.cartItems);
    } catch {
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await getProductsData()
    }
    fetchProduct()
  },[])

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (user) {
      getCart(); 
    } else {
      setCartItems([]);
    }
  }, [user]);

  const value = {
    user,
    setUser,
    logout,

    doctors,
    products,
    cartItems,

    currencySymbol,
    loading,

    getDoctorsData,
    getProductsData,
    getCart,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
