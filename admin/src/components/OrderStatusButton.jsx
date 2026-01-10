const OrderStatusButton = ({ order, onStatusChange }) => {
  const ORDER_STATUS_FLOW = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const STATUS_STYLES = {
    PENDING: "text-slate-600 bg-slate-100",
    CONFIRMED: "text-yellow-600 bg-yellow-100",
    SHIPPED: "text-blue-600 bg-blue-100",
    DELIVERED: "text-green-600 bg-green-100",
    CANCELLED: "text-red-600 bg-red-100",
  };
  const currentStatus = order.status;
  const nextStatuses = ORDER_STATUS_FLOW[currentStatus] || [];

  return (
    <select
      value={currentStatus}
      disabled={nextStatuses.length === 0}
      onChange={(e) => onStatusChange(order.id, e.target.value)}
      className={`
        rounded-full px-3 py-1 text-sm font-medium cursor-pointer
        ${STATUS_STYLES[currentStatus]}
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      {/* Current status */}
      <option value={currentStatus}>
        {currentStatus.replace("_", " ").toUpperCase()}
      </option>

      {/* Allowed transitions */}
      {nextStatuses.map((status) => (
        <option key={status} value={status}>
          {status.replace("_", " ").toUpperCase()}
        </option>
      ))}
    </select>
  );
};


export default OrderStatusButton