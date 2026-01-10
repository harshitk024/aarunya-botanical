import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
  <p className="mb-3 text-lg font-medium">All Appointments</p>

  <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">

    {/* Header */}
    <div className="hidden sm:grid grid-cols-[0.5fr_3fr_2fr_3fr_1fr_1.5fr] 
      items-center py-3 px-6 border-b font-medium text-gray-700">
      <p>#</p>
      <p>Patient</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p className="text-center">Fees</p>
      <p className="text-center">Status</p>
    </div>

    {/* Rows */}
    {appointments.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[0.5fr_3fr_2fr_3fr_1fr_1.5fr]
        items-center gap-y-2 py-3 px-6 border-b
        text-gray-500 hover:bg-gray-50"
      >
        <p>{index + 1}</p>

        {/* Patient */}
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={item.patient.image}
            alt=""
          />
          <p className="truncate">{item.patient.name}</p>
        </div>

        {/* Date */}
        <p>
          {new Date(item.startTime).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        {/* Doctor */}
        <p className="truncate">{item.doctor.name}</p>

        {/* Fees */}
        <p className="text-center font-medium">
          {currency}{item.amount}
        </p>

        {/* Status */}
        <div className="text-center">
          {item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
          ) : item.isCompleted ? (
            <p className="text-green-500 text-xs font-medium">Completed</p>
          ) : (
            <p className="text-gray-400 text-xs font-medium">Scheduled</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  )
};

export default AllAppointments;
