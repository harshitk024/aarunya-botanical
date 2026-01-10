import { Router } from "express";
import { startZoomMeeting } from "./meeting.controller";
import { authMiddleware} from "../../middlewares/auth.middleware";
import { doctorMiddleware } from "../../middlewares/doctor.middleware";
import { joinZoomMeeting } from "./meeting.controller";
const meetingRouter = Router()

meetingRouter.use(authMiddleware)


meetingRouter.post("/:appointmentId/start-meeting",doctorMiddleware,startZoomMeeting)
meetingRouter.get("/:appointmentId/join-meeting",joinZoomMeeting)

export default meetingRouter