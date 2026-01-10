import prisma from "../../config/prisma";

export const getDoctorAppointments = async (req: any, res: any) => {
  const doctorId = req.user.userId;

  const appointments = await prisma.appointment.findMany({
    where: { doctorId },
    include: {
      patient: { select: { name: true, email: true,image: true} },
    },
    orderBy: { startTime: "asc" },
  });

  console.log(appointments)

  res.json(appointments);
};

export const completeAppointment = async (req: any, res: any) => {
  const { id } = req.params;

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "COMPLETED" },
  });

  res.json(appointment);
};

export const getPublicDoctors = async (_req: any, res: any) => {
  try {
    const doctors = await prisma.doctorProfile.findMany({
      where: {
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });

    const formattedDoctors = doctors.map((doc) => ({
      id: doc.user.id,
      name: doc.user.name,
      image: doc.user.image,
      speciality: doc.speciality,
      experience: doc.experience,
      fees: doc.fees,
      isActive: doc.isActive,
      about: doc.about,
      degree: doc.degree
    }));

    res.json(formattedDoctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};


export const getDoctorDashboard = async (req: any, res: any) => {
  try {

    const doctorId = req.user.id;

    const earningsAgg = await prisma.appointment.aggregate({
      where: {
        doctorId,
        paymentDone: true,
        status: "COMPLETED",
      },
      _sum: {
        amount: true,
      },
    });

    const earnings =
      earningsAgg._sum.amount
        ? earningsAgg._sum.amount/ 100
        : 0;


    const appointments = await prisma.appointment.count({
      where: { doctorId },
    });


    const patientsAgg = await prisma.appointment.findMany({
      where: { doctorId },
      select: { patientId: true },
      distinct: ["patientId"],
    });

    const patients = patientsAgg.length;


    const latestAppointmentsRaw = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { startTime: "desc" },
      take: 5,
      include: {
        patient: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const latestAppointments = latestAppointmentsRaw.map((item) => ({
      _id: item.id,
      slotDate: item.startTime,
      cancelled: item.status === "CANCELLED",
      isCompleted: item.status === "COMPLETED",
      userData: {
        name: item.patient.name,
        image: item.patient.image,
      },
    }));


    res.status(200).json({
      success: true,
      dashData: {
        earnings,
        appointments,
        patients,
        latestAppointments,
      },
    });
  } catch (error) {
    console.error("Doctor Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};


export const getDoctorProfile = async (req: any, res: any) => {
  try {

    const userId = (req as any).user?.userId

    const doctor = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        doctorProfile: true,
      },
    });

    if (!doctor || !doctor.doctorProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profileData: {
        name: doctor.name,
        image: doctor.image,
        degree: doctor.doctorProfile.degree,
        speciality: doctor.doctorProfile.speciality,
        experience: doctor.doctorProfile.experience,
        about: doctor.doctorProfile.about,
        fees: doctor.doctorProfile.fees,
        address: doctor.address,
        available: doctor.doctorProfile.isActive,
      },
    });
  } catch (error) {
    console.error("Get Doctor Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profile",
    });
  }
};

export const updateDoctorProfile = async (req: any, res: any) => {
  try {
    const userId = (req as any).user?.userId
    const { address, fees, available } = req.body;

    // Safety checks
    if (fees !== undefined && fees < 0) {
      return res.json({
        success: false,
        message: "Invalid fees amount",
      });
    }

    // Update User (address)
    await prisma.user.update({
      where: { id: userId },
      data: {
        address,
      },
    });

    // Update DoctorProfile (fees & availability)
    await prisma.doctorProfile.update({
      where: { userId: userId },
      data: {
        fees: Number(fees),
        isActive: available,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update Doctor Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


