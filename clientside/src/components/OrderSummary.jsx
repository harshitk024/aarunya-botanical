import { PlusIcon, SquarePenIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddressModal from "./AddressModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import api from "../lib/axios";

const OrderSummary = ({ totalPrice, items }) => {
  const { user } = useContext(AppContext);
  const [loading,setLoading] = useState(false)
  const currency = "₹";

  const navigate = useNavigate();
  const addressList = user?.address;

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    if (addressList == "") {
      setSelectedAddress(false);
    } else {
      setSelectedAddress(addressList);
    }
  }, [addressList]);

  if (!user) return <div>Loading..</div>;

  const handleCouponCode = async (event) => {
    event.preventDefault();
  };

  // const handlePlaceOrder = async (e) => {

  //     try {

  //     const {data} = await api.post(`/api/products/place-order`,{})

  //     if(data.success){
  //         toast.success("Order placed Successfully")
  //         navigate('/orders')
  //     }

  //     } catch (error) {
  //         console.log(error)
  //     }

  // }

  const handlePlaceOrder = async () => {

    setLoading(true)

    try {
    console.log("Order placed")
    const res = await api.post("/api/products/create-order",{});
    console.log("Order created")

    console.log("res:",res)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: res.data.amount * 100,
      order_id: res.data.razorpayOrderId,

      handler: async function (response) {
        await api.post("/api/products/verify-payment", {
          orderId: res.data.orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      navigate("/orders")
      },

    };
    setLoading(false)
    
    const rzp = new window.Razorpay(options);
    
    rzp.on("payment.failed", async function (response){
      await axios.post("/api/payment-failed", {
        orderId: res.data.orderId
      })
    })

    rzp.open()
} catch(error) {

    console.log(error)

}

};

  if (!addressList) return <div>Loading...</div>;
  console.log("addressList: ", selectedAddress);

  return (
    <div className="w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7">
      <h2 className="text-xl font-medium text-slate-600">Payment Summary</h2>
      <p className="text-slate-400 text-xs my-4">Payment Method</p>
      {/* <div className="flex gap-2 items-center">
        <input
          type="radio"
          id="COD"
          onChange={() => setPaymentMethod("COD")}
          checked={paymentMethod === "COD"}
          className="accent-gray-500"
        />
        <label htmlFor="COD" className="cursor-pointer">
          COD
        </label>
      </div> */}
      <div className="flex gap-2 items-center mt-1">
        <input
          type="radio"
          id="STRIPE"
          name="payment"
          onChange={() => setPaymentMethod("ONLINE")}
          checked={paymentMethod === "ONLINE"}
          className="accent-gray-500"
        />
        <label htmlFor="STRIPE" className="cursor-pointer">
          ONLINE
        </label>
      </div>
      <div className="my-4 py-4 border-y border-slate-200 text-slate-400">
        <p>Address</p>
        {selectedAddress ? (
          <div className="flex gap-2 items-center">
            <p>
              {selectedAddress.name}, {selectedAddress.city},{" "}
              {selectedAddress.state}, {selectedAddress.zip}
            </p>
            <SquarePenIcon
              onClick={() => setShowAddressModal(true)}
              className="cursor-pointer"
              size={18}
            />
          </div>
        ) : (
          <div>
            <button
              className="flex items-center gap-1 text-slate-600 mt-1"
              onClick={() => setShowAddressModal(true)}
            >
              Add Address <PlusIcon size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="pb-4 border-b border-slate-200">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 text-slate-400">
            <p>Subtotal:</p>
            <p>Shipping:</p>
            {coupon && <p>Coupon:</p>}
          </div>
          <div className="flex flex-col gap-1 font-medium text-right">
            <p>
              {currency}
              {totalPrice.toLocaleString()}
            </p>
            <p>Free</p>
            {coupon && (
              <p>{`-${currency}${((coupon.discount / 100) * totalPrice).toFixed(2)}`}</p>
            )}
          </div>
        </div>
        {!coupon ? (
          <form
            onSubmit={(e) =>
              toast.promise(handleCouponCode(e), {
                loading: "Checking Coupon...",
              })
            }
            className="flex justify-center gap-3 mt-3"
          >
            <input
              onChange={(e) => setCouponCodeInput(e.target.value)}
              value={couponCodeInput}
              type="text"
              placeholder="Coupon Code"
              className="border border-slate-400 p-1.5 rounded w-full outline-none"
            />
            <button className="bg-slate-600 text-white px-3 rounded hover:bg-slate-800 active:scale-95 transition-all">
              Apply
            </button>
          </form>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 text-xs mt-2">
            <p>
              Code:{" "}
              <span className="font-semibold ml-1">
                {coupon.code.toUpperCase()}
              </span>
            </p>
            <p>{coupon.description}</p>
            <XIcon
              size={18}
              onClick={() => setCoupon("")}
              className="hover:text-red-700 transition cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between py-4">
        <p>Total:</p>
        <p className="font-medium text-right">
          {currency}
          {coupon
            ? (totalPrice - (coupon.discount / 100) * totalPrice).toFixed(2)
            : totalPrice.toLocaleString()}
        </p>
      </div>
      <button
        onClick={(e) =>
          toast.promise(handlePlaceOrder(e), { loading: "placing Order..." })
        }
        disabled={loading}
        className={
          `w-full py-2.5 rounded transiton-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-slate-700 hover:bg-slate-900 active:scale-95 text-white"}`
        }
      >
        {loading ? "Loading...":"Place Order" }
      </button>

      {showAddressModal && (
        <AddressModal
          setSelectedAddress={setSelectedAddress}
          setShowAddressModal={setShowAddressModal}
          existingAddress={selectedAddress}
        />
      )}
    </div>
  );
};

export default OrderSummary;
