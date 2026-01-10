import axios from "axios";
import { ZOOM_ACCOUNT_ID,ZOOM_CLIENT_ID,ZOOM_CLIENT_SECRET } from "../config/zoom";

export const getZoomAccessToken = async () => {

  console.log(ZOOM_ACCOUNT_ID,ZOOM_CLIENT_ID,ZOOM_CLIENT_SECRET)
  const res = await axios.post(
    "https://zoom.us/oauth/token",
    null,
    {
      params: {
        grant_type: "account_credentials",
        account_id: ZOOM_ACCOUNT_ID!,
      },
      auth: {
        username: ZOOM_CLIENT_ID!,
        password: ZOOM_CLIENT_SECRET!,
      },
    }
  );

  return res.data.access_token;
};

