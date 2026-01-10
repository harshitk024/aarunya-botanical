import { useContext } from "react";
import OrderStatusButton from "./OrderStatusButton";
import toast from "react-hot-toast";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

const OrderItem = ({ order }) => {
  const currency = "₹";

  const { backendUrl, aToken, getAllOrders } = useContext(AdminContext);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.patch(
        backendUrl + `/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data) {
        toast.success(`Order marked as ${newStatus}`);
        getAllOrders();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <tr className="text-sm align-top">
        {/* Product */}
        <td className="text-left">
          <div className="flex flex-col gap-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 aspect-square bg-slate-100 rounded-md overflow-hidden">
                  <img
                    src={item.product.images[0].imageUrl}
                    alt="product_img"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="font-medium text-slate-700">
                    {item.product.name}
                  </p>
                  <p className="text-slate-500">
                    {currency}
                    {item.priceCents} · Qty: {item.quantity}
                  </p>
                  <p className="text-xs text-slate-400">
                    Placed At: {new Date(order.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </td>

        {/* Total Price */}
        <td className="text-center font-medium max-md:hidden">
          {currency}
          {order.total}
        </td>

        {/* Payment Mode */}
        <td className="max-md:hidden">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            {order.paymentMode}
          </span>
        </td>

        {/* Ordered By */}
        <td className="max-md:hidden">
          <div className="text-sm">
            <p className="font-medium text-slate-700">
              {order.user?.name || "Guest"}
            </p>
            <p className="text-xs text-slate-500">{order.user?.email}</p>
          </div>
        </td>

        {/* Address */}
        <td className="max-md:hidden text-sm text-slate-600 leading-relaxed">
          <p>{order.user.address.street}</p>
          <p>
            {order.user.address.city}, {order.user.address.state} -{" "}
            {order.user.address.zip}
          </p>
          <p>{order.user.address.country}</p>
          <p className="text-xs text-slate-500">{order.user.address.phone}</p>
        </td>

        {/* Update Status */}
        <td className="max-md:hidden">
          <OrderStatusButton
            order={order}
            onStatusChange={handleStatusChange}
          />
        </td>
      </tr>

      {/* Mobile */}
      <tr className="md:hidden">
        <td colSpan={6} className="space-y-2 py-4">
          <p className="text-sm font-medium">
            {order.user?.name} · {order.paymentMode}
          </p>

          <p className="text-xs text-slate-500">
            {order.user.address.city}, {order.user.address.state}
          </p>

          <div className="flex justify-center">
            <span className="px-6 py-1.5 rounded-full bg-green-100 text-green-700 text-xs">
              {order.status.replace(/_/g, " ").toLowerCase()}
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td colSpan={6}>
          <div className="border-b border-slate-300 w-6/7 mx-auto" />
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
