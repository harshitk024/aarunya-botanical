import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { currencySymbol, backendUrl, token } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [loading,setLoading] = useState(false)
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [days, setDays] = useState([]);

 useEffect(() => {
  const fetchDoctor = async () => {
    try {
      const {data}  = await axios.get(
        `${backendUrl}/api/doctor/id/${docId}`
      );

      if(data.success){
        setDocInfo(data.doctor)
      }

      console.log(data)

    } catch (err) {
      console.log(err)
      toast.error("Failed to load doctor");
    }
  };

  if (docId) fetchDoctor();
}, [docId]);

  const getAvailableSlots = async () => {
    try {
      setDocSlots([]);
      setSlotTime("");

      const today = new Date();
      const days = [];

      const date = new Date(today);
      for (let i = 0; i < 7; i++) {
        date.setDate(today.getDate() + i);

        days.push({
          date,
          label: daysOfWeek[date.getDay()],
          day: date.getDate(),
        });
      }

      setDays(days);

      const slotsPerDay = [];
      const requests = []

      setLoading(true)


      for (let i = 0;i < 7;i++){
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const yyMmDd = date.toISOString().split("T")[0]

        requests.push(axios.get(`${backendUrl}/api/appointments/${docId}/availability`,{
          headers: {Authorization: `Bearer ${token}`},
          params: {date: yyMmDd}
        }))
      }

      console.time("weekly-slots")

      const responses = await Promise.all(requests)

      console.timeEnd("weekly-slots")

      console.log(responses)


      responses.forEach(({data},i) => {
        if (!data.success || !data.workingHours){
          slotsPerDay.push([])
          return
        }

        const {startTime,endTime} = data.workingHours
        const bookedSlots = data.bookedSlots || []

        const date = new Date();
        console.log("i: ",i)
        date.setDate(today.getDate() + i);

        const yyyyMmDd = date.toISOString().split("T")[0];
        const daySlots = [];
        const current = new Date(`${yyyyMmDd}T${startTime}`);
        const end = new Date(`${yyyyMmDd}T${endTime}`);
        const now = new Date();

        while (current < end) {
          const slotEnd = new Date(current);
          slotEnd.setMinutes(slotEnd.getMinutes() + 30);

          const isToday = current.toDateString() === now.toDateString();

          // ❌ Hide past slots for today
          if (isToday && current <= now) {
            current.setMinutes(current.getMinutes() + 30);
            continue;
          }

          const overlaps = bookedSlots.some(
            (b) =>
              new Date(b.startTime) < slotEnd && new Date(b.endTime) > current
          );

          if (!overlaps && slotEnd <= end) {
            daySlots.push({
              datetime: new Date(current),
              time: current.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            });
          }

          current.setMinutes(current.getMinutes() + 30);
        }

        slotsPerDay.push(daySlots);
      })

      // console.time("weekly-slots")
      // for (let i = 0; i < 7; i++) {
      //   const date = new Date(today);
      //   date.setDate(today.getDate() + i);

      //   const yyyyMmDd = date.toISOString().split("T")[0];


      //   const { data } = await axios.get(
      //     `${backendUrl}/api/appointments/${docId}/availability`,
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //       params: { date: yyyyMmDd },
      //     }
      //   );

      

      //   console.log("slots data: ",data)

      //   if (!data.success || !data.workingHours) {
      //     slotsPerDay.push([]);
      //     continue;
      //   }


      //   const { startTime, endTime } = data.workingHours;
      //   const bookedSlots = data.bookedSlots || [];

      //   const daySlots = [];
      //   const current = new Date(`${yyyyMmDd}T${startTime}`);
      //   const end = new Date(`${yyyyMmDd}T${endTime}`);
      //   const now = new Date();

      //   while (current < end) {
      //     const slotEnd = new Date(current);
      //     slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      //     const isToday = current.toDateString() === now.toDateString();

      //     // ❌ Hide past slots for today
      //     if (isToday && current <= now) {
      //       current.setMinutes(current.getMinutes() + 30);
      //       continue;
      //     }

      //     const overlaps = bookedSlots.some(
      //       (b) =>
      //         new Date(b.startTime) < slotEnd && new Date(b.endTime) > current
      //     );

      //     if (!overlaps && slotEnd <= end) {
      //       daySlots.push({
      //         datetime: new Date(current),
      //         time: current.toLocaleTimeString([], {
      //           hour: "2-digit",
      //           minute: "2-digit",
      //           hour12: true,
      //         }),
      //       });
      //     }

      //     current.setMinutes(current.getMinutes() + 30);
      //   }

      //   slotsPerDay.push(daySlots);
      // }
      // console.timeEnd("weekly-slots")
      setLoading(false)
      setDocSlots(slotsPerDay);

      // ✅ Auto-select first available day
      const firstAvailableIndex = slotsPerDay.findIndex(
        (day) => day.length > 0
      );

      if (firstAvailableIndex !== -1) {
        setSlotIndex(firstAvailableIndex);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load slots");
    }
  };

  useEffect(() => {
    if (docInfo) {

      getAvailableSlots();
    }
  }, [docInfo]);

  /* -------------------- Book Appointment -------------------- */
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const selectedSlot = docSlots[slotIndex].find((s) => s.time === slotTime);

      const startTime = selectedSlot.datetime;
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);

      const { data } = await axios.post(
        `${backendUrl}/api/appointments/${docInfo.id}/book`,
        { startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data) {
        toast.success("Appointment Scheduled");
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Booking failed");
    }
  };

  if (!docInfo) return null;

  const selectedDaySlots = docSlots.length > 0 ? docSlots[slotIndex] : [];

  console.log(docSlots)

  const noSlotsAvailable = selectedDaySlots.length === 0;

  const isToday =
    selectedDaySlots[0]?.datetime.toDateString() === new Date().toDateString();

  return (
    <div>
      {/* -------------------- Doctor Details -------------------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full max-h-60 sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience} Years
            </button>
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium text-gray-600 flex gap-1">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* -------------------- Booking Slots -------------------- */}
      <div className="sm:ml-60 sm:pl-4 mt-5 font-medium text-gray-700">
        <p>Booking slots</p>

        <div className="flex flex-wrap gap-3 mt-4">
          {docSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
              }`}
            >
                <p>{days[index].label}</p>
                <p>{days[index].day}</p>
              </div>
          ))}
        </div>

        {/* Slot list / empty state */}
        <div className="mt-4">
          {noSlotsAvailable ? (
            <p className="text-sm text-gray-400">
              {loading ? "Loading Slots.. Please Wait" : isToday
                ? "No slots available today"
                : "No slots available for this day"}
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {selectedDaySlots.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-bold flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
