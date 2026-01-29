import prisma from "../../config/prisma";

const formatAmPm = (date: Date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });


export const bookAppointment = async (req: any, res: any) => {
  const patientId = req.user.userId          // User.id
  const doctorUserId = req.params.doctorId   // User.id
  const { startTime, endTime } = req.body

  try {
    const start = new Date(startTime)
    const end = new Date(endTime)

    const appointment = await prisma.$transaction(async (tx) => {

      // 1️⃣ Resolve DoctorProfile FIRST
      const doctorProfile = await tx.doctorProfile.findUnique({
        where: { userId: doctorUserId },
      })

      if (!doctorProfile) {
        throw new Error("Doctor not found")
      }

      const doctorProfileId = doctorProfile.id

      // 2️⃣ Lock overlapping appointments (DoctorProfile.id)
      const overlapping = await tx.$queryRaw<
        { id: string }[]
      >`
        SELECT id FROM "Appointment"
        WHERE "doctorId" = ${doctorProfileId}
          AND status = 'SCHEDULED'
          AND "startTime" < ${end}
          AND "endTime" > ${start}
        FOR UPDATE
      `

      if (overlapping.length > 0) {
        throw new Error("Slot not available")
      }

      // 3️⃣ Create appointment
      return await tx.appointment.create({
        data: {
          patientId,
          doctorId: doctorProfileId, // ✅ DoctorProfile.id
          startTime: start,
          endTime: end,
          amount: doctorProfile.fees,
        },
      })
    })

    return res.status(201).json({
      success: true,
      appointmentId: appointment.id,
    })

  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}



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

    const dayStart = new Date(Date.UTC(
      targetDate.getUTCFullYear(),
      targetDate.getUTCMonth(),
      targetDate.getUTCDate()
    ));

    const dayEnd = new Date(dayStart.getTime() + 86400000);

    const bookedSlots = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.doctorProfile.id,
        status: { not: "CANCELLED" },
        startTime: {
          gte: dayStart,
          lt: dayEnd
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
            user: true,
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
        startTime: apt.startTime,
        endTime: apt.endTime,
        cancelled: apt.status === "CANCELLED",
        isCompleted: apt.status === "COMPLETED",
        docData: {
          name: apt.doctor.user.name,
          speciality: apt.doctor.speciality,
          image: apt.doctor.user.image,
          address: apt.doctor.user.address,
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
