import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import OrderItem from "../../components/OrderItem";


const AllOrders = () => {
  const { currency, getAllOrders, orders,aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllOrders();
    }
  }, [aToken]);

  console.log(orders)

  return (
    <div className="w-full max-w-6xl m-5">
      <p className=" text-lg font-medium">All Orders</p>
      <div className="min-h-[70vh] mx-6">
        {orders.length > 0 ? (
          <div className=" max-w-7xl mx-auto">
            <table className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-12 border-spacing-x-8">
              <thead>
                <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                  <th className="text-left">Product</th>
                  <th className="text-center">Total Price</th>
                  <th className="text-center">Payment</th>
                  <th>Ordered By</th>
                  <th className="text-left">Address</th>
                  <th className="text-left">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderItem order={order} key={order.id} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              You have no orders
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
