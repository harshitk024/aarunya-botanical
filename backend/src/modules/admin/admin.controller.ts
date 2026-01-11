import prisma from "../../config/prisma";
import bcrypt from "bcrypt"
import { OrderStatus } from "@prisma/client";
import { ORDER_STATUS_FLOW } from "../../utils/orderStatusFlow";

export const getAllDoctors = async (_req: any, res: any) => {

  const doctors = await prisma.doctorProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      availabilities: true,
      availabilityOverrides: true,
    },
  });

  res.json(doctors);
};



export const addDoctor = async (req: any, res: any) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      fees,
      about,
      speciality,
      degree,
      image, // 👈 Cloudinary URL from frontend
      address,
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !experience ||
      !fees ||
      !speciality ||
      !degree ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // 4️⃣ DB transaction
    const doctor = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "DOCTOR",
          image, // 👈 save Cloudinary URL
          address, // optional
        },
      });

      const doctorProfile = await tx.doctorProfile.create({
        data: {
          userId: user.id,
          speciality,
          degree,
          experience: Number(experience),
          fees: Number(fees),
          about,
        },
      });

      return { user, doctorProfile };
    });

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("❌ addDoctor error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  }
};
export const toggleDoctorStatus = async (req: any, res: any) => {
  const { doctorProfileId, isActive } = req.body;

  const doctor = await prisma.doctorProfile.update({
    where: { id: doctorProfileId },
    data: { isActive },
  });

  res.json(doctor);
};

export const upsertWeeklyAvailability = async (req: any, res: any) => {
  const { doctorId, dayOfWeek, startTime, endTime } = req.body;

  const slot = await prisma.weeklyAvailability.upsert({
    where: {
      doctorId_dayOfWeek: { doctorId, dayOfWeek },
    },
    update: { startTime, endTime },
    create: { doctorId, dayOfWeek, startTime, endTime },
  });

  res.json(slot);
};

export const blockDate = async (req: any, res: any) => {
  const { doctorId, date } = req.body;

  const block = await prisma.availabilityOverride.create({
    data: {
      doctorId,
      date: new Date(date),
      status: "BLOCKED",
    },
  });

  res.json(block);
};


export const getAllAppointments = async (_req: any, res: any) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: { select: { name: true, email: true, image: true } },
      doctor: { select: { name: true, email: true, image: true } },
    },
    orderBy: { startTime: "desc" },
  });

  res.json(appointments);
};


export const cancelAppointment = async (req: any, res: any) => {
  const { id } = req.params;

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  res.json(appointment);
};


export const getDashboardData = async (_req: any, res: any) => {
  try {
    const [
      doctors,
      patients,
      appointments,
      latestAppointments,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "DOCTOR" } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.appointment.count(),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          doctor: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
    ]);

    // Format exactly for frontend
    const formattedLatestAppointments = latestAppointments.map((appt) => ({
      _id: appt.id,
      slotDate: appt.startTime,
      cancelled: appt.status === "CANCELLED",
      isCompleted: appt.status === "COMPLETED",
      docData: {
        name: appt.doctor.name,
        image: appt.doctor.image,
      },
    }));

    res.json({
      doctors,
      appointments,
      patients,
      latestAppointments: formattedLatestAppointments,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};


export const getAllOrders = async (req: any, res: any) => {

  try {

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
      user:true
    },
  })


   return res.status(200).json({
      success: true,
      orders,
    });
  
  } catch (error) {
     console.error("GET ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
     
  }
}


export const updateOrderStatus = async (req:any , res:any ) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const adminId = req.user?.userId;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Fetch order
      const order = await tx.order.findUnique({
        where: { id: orderId },
        select: { id: true, status: true },
      });

      if (!order) {
        throw new Error('ORDER_NOT_FOUND');
      }

      const currentStatus = order.status;
      const newStatus = status as OrderStatus;

      // 2️⃣ Prevent duplicate update
      if (currentStatus === newStatus) {
        throw new Error('STATUS_ALREADY_SET');
      }

      // 3️⃣ Validate transition
      const allowed = ORDER_STATUS_FLOW[currentStatus];

      if (!allowed.includes(newStatus)) {
        throw new Error('INVALID_TRANSITION');
      }

      // 4️⃣ Update order
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      // 5️⃣ Log history
      await tx.orderStatusLog.create({
        data: {
          orderId,
          oldStatus: currentStatus,
          newStatus,
          updatedBy: adminId,
        },
      });

      return updatedOrder;
    });

    return res.json({
      message: 'Order status updated successfully',
      order: result,
    });
  } catch (err: any) {
    if (err.message === 'ORDER_NOT_FOUND') {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (err.message === 'STATUS_ALREADY_SET') {
      return res.status(400).json({ message: 'Order already has this status' });
    }
    if (err.message === 'INVALID_TRANSITION') {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
