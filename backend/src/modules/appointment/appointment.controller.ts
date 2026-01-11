import prisma from "../../config/prisma";

const formatAmPm = (date: Date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });


export const bookAppointment = async (req: any, res: any) => {
  const patientId = req.user.userId;
  const {doctorId} = req.params
  const {startTime, endTime } = req.body;
  console.log("Doctor Id: ",doctorId)

  const overlapping = await prisma.appointment.findFirst({
    where: {
      doctorId,
      status: "SCHEDULED",
      OR: [
        { startTime: { lt: endTime, gte: startTime } },
        { endTime: { gt: startTime, lte: endTime } },
      ],
    },
  });

  if (overlapping) {
    return res.status(400).json({ message: "Slot not available" });
  }

  const doctor = await prisma.user.findUnique({
    where: {id: doctorId},
    include: {
      doctorProfile: true
    }
  })

  console.log(doctor)

  if(!doctor || !doctor.doctorProfile){
    throw new Error("Doctor not found")
  }


  const appointment = await prisma.appointment.create({
    data: {
      patientId,
      doctorId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      amount: doctor.doctorProfile.fees,
    },
  });

  res.json(appointment);
};

export const getAvailableSlots = async (req: any, res: any) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const targetDate = new Date(date as string);
    const dayOfWeek = targetDate.getUTCDay();

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: {
        doctorProfile: true,
      },
    });

    if (!doctor || !doctor.doctorProfile?.isActive) {
      return res.json({
        success: false,
        message: "Doctor not available",
      });
    }

    const weekly = await prisma.weeklyAvailability.findUnique({
      where: {
        doctorId_dayOfWeek: {
          doctorId: doctor.doctorProfile.id,
          dayOfWeek,  
        },
      },
    });

    if (!weekly) {
      return res.json({
        success: true,
        workingHours: null,
        bookedSlots: [],
      });
    }

    const override = await prisma.availabilityOverride.findFirst({
      where: {
        doctorId: doctor.doctorProfile.id,
        date: {
          gte: new Date(targetDate.toDateString()),
          lt: new Date(new Date(targetDate.toDateString()).getTime() + 86400000),
        },
        status: "BLOCKED",
      },
    });

    if (override) {
      return res.json({
        success: true,
        workingHours: null,
        bookedSlots: [],
      });
    }

    const bookedSlots = await prisma.appointment.findMany({
      where: {
        doctorId,
        status: { not: "CANCELLED" },
        startTime: {
          gte: new Date(targetDate.toDateString()),
          lt: new Date(new Date(targetDate.toDateString()).getTime() + 86400000),
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    res.json({
      success: true,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        fees: doctor.doctorProfile.fees,
      },
      date,
      workingHours: {
        startTime: weekly.startTime,
        endTime: weekly.endTime,

        startTimeLabel: formatAmPm(new Date(weekly.startTime)),
        endTimeLabel: formatAmPm(new Date(weekly.endTime))
      },
      bookedSlots: bookedSlots.map(slot => ({

        startTime: slot.startTime,
        endTime: slot.endTime,

        startLabel: formatAmPm(slot.startTime),
        endLabel: formatAmPm(slot.endTime)
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch availability",
    });
  }
};


export const getUserAppointments = async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        doctor: {
          include: {
            doctorProfile: true,
          },
        },
      },
    });

    // Transform data for frontend
    const formattedAppointments = appointments.map((apt) => {
      const start = new Date(apt.startTime);

      const slotDate = `${start.getDate()}_${start.getMonth() + 1}_${start.getFullYear()}`;
      const slotTime = start.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        _id: apt.id,
        slotDate,
        slotTime,
        cancelled: apt.status === "CANCELLED",
        isCompleted: apt.status === "COMPLETED",
        docData: {
          name: apt.doctor.name,
          speciality: apt.doctor.doctorProfile?.speciality ?? "",
          image: apt.doctor.image,
          address: apt.doctor.address,
        },
      };
    });

    res.json({
      success: true,
      appointments: formattedAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};

export const cancelAppointment = async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { appointmentId } = req.body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.patientId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (appointment.status !== "SCHEDULED") {
      return res.status(400).json({
        success: false,
        message: "Appointment cannot be cancelled",
      });
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: "CANCELLED",
      },
    });

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
};
