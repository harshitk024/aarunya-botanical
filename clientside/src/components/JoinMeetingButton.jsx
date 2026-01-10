import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";


const JoinMeetingButton = ({ appointmentId }) => {


  console.log("Joined button Id:  ",appointmentId)


  const [loading, setLoading] = useState(false);

  const {token,backendUrl} = useContext(AppContext)

  const joinMeeting = async () => {
    try {
      setLoading(true);

      const res = await axios.get( backendUrl + 
        `/api/meeting/${appointmentId}/join-meeting`,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
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
