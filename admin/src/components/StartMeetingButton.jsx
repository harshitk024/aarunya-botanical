import axios from "axios";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const StartMeetingButton = ({appointmentId}) => {

    console.log(appointmentId)

  const {dToken} = useContext(DoctorContext)

  
  const startMeeting = async () => {
    try {

      const {data} = await axios.post(backendUrl + `/api/meeting/${appointmentId}/start-meeting`,{},{
        headers: {Authorization: `Bearer ${dToken}`}
      })

      // 🚀 This is what actually STARTS the Zoom meeting
      window.location.href = data.meetingUrl;
    } catch (err) {
      console.log(err)
      alert(err.response?.data?.message || "Failed to start meeting");
    }
  };

  return (
    <button onClick={startMeeting} className="bg-green-400 p-3 rounded-full hover:bg-green-600 hover:text-white">
      Start Meeting
    </button>
  );
};

export default StartMeetingButton;
