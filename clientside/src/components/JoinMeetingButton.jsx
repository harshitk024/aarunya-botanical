import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import api from "../lib/axios";

const JoinMeetingButton = ({ appointmentId }) => {


  console.log("Joined button Id:  ",appointmentId)


  const [loading, setLoading] = useState(false);

  const joinMeeting = async () => {
    try {
      setLoading(true);

      const res = await api.get( 
        `/api/meeting/${appointmentId}/join-meeting`,
      );

      // Redirect user to Zoom
      window.location.href = res.data.meetingUrl;
    } catch (err) {
      console.log(err)
      alert(
        err.response?.data?.message ||
          "Meeting not available yet"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={joinMeeting} disabled={loading} className="hover:bg-blue-600 p-3 rounded-2xl">
      {loading ? "Joining..." : "Join Meeting"}
    </button>
  );
};

export default JoinMeetingButton;
