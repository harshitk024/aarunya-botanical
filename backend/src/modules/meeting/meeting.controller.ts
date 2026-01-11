import { Request, Response } from "express";
import axios from "axios";
import prisma from "../../config/prisma";
import { getZoomAccessToken } from "../../utils/zoom";

export const startZoomMeeting = async (req: any, res: any) => {
  try {
    const appointmentId = req.params.appointmentId;
    const userId = req.user!.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1️⃣ Fetch appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 2️⃣ Authorization (doctor only)
    if (appointment.doctorId !== userId) {
      return res.status(403).json({ message: "Not allowed to start meeting" });
    }

    // 3️⃣ Time window check (±15 min)
    // const now = new Date();
    // const start = new Date(appointment.startTime);
    // const diffMinutes =
    //   Math.abs(now.getTime() - start.getTime()) / 60000;

    // if (diffMinutes > 15) {
    //   return res
    //     .status(400)
    //     .json({ message: "Outside meeting time window" });
    // }

    // 4️⃣ If meeting already exists, return it
    if (appointment.zoomStartUrl) {
      return res.json({
        meetingUrl: appointment.zoomStartUrl,
        meetingId: appointment.zoomMeetingId,
        isHost: true,
      });
    }

    // 5️⃣ Create Zoom meeting
    const token = await getZoomAccessToken();

    const user = await prisma.user.findUnique({
        where: {id: userId}
    })

    if(!user){
        throw new Error("User do not exist")
    }

    const zoomRes = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: `Appointment with ${user.name}`,
        type: 2,
        start_time: appointment.startTime.toISOString(),
        duration: appointment.duration,
        settings: {
          waiting_room: true,
          join_before_host: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const zoomData = zoomRes.data as any

    // 6️⃣ Save meeting details
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        zoomMeetingId: String(zoomData.id),
        zoomJoinUrl: zoomData.join_url,
        zoomStartUrl: zoomData.start_url,
      },
    });

    // 7️⃣ Return host data
    return res.json({
      meetingUrl: zoomData.start_url,
      meetingId: zoomData.id,
      isHost: true,
    });
  } catch (error) {
    console.error("Zoom meeting error:", error);
    return res
      .status(500)
      .json({ message: "Failed to start Zoom meeting" });
  }
};


export const joinZoomMeeting = async (req: any, res: any) => {
  const appointmentId = req.params.appointmentId;
  const userId = req.user!.userId;

  console.log("Appointment Id: ",appointmentId)

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    select: {
      patientId: true,
      zoomJoinUrl: true,
    },
  });

  if (!appointment?.zoomJoinUrl) {
    return res
      .status(400)
      .json({ message: "Meeting not started yet" });
  }

  if (appointment.patientId !== userId) {
    return res.status(403).json({ message: "Not allowed to join" });
  }

  res.json({
    meetingUrl: appointment.zoomJoinUrl,
    isHost: false,
  });
};
