import { Request, Response } from "express";
import prisma from "../../config/prisma";

export const getProfile = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).user?.userId 

    console.log(userId)

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        gender: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCartItems = async (req: any, res: any) => {
  try {
    const userId = (req as any).user?.userId 

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              select: {
                imageUrl: true,
              },
              take: 1, // only first image
            },
          },
        },
      },
    });

    const formattedCartItems = cartItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.images[0]?.imageUrl || null,
      },
    }));

    return res.status(200).json({
      cartItems: formattedCartItems,
    });
  } catch (error) {
    console.error("GET CART ITEMS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch cart items",
    });
  }
};


export const saveUserAddress = async (req: any, res:any) => {
  try {
    const userId = (req as any).user?.userId 

    const {
      name,
      email,
      street,
      city,
      state,
      zip,
      country,
      phone,
    } = req.body;

    if (!street || !city || !zip || !country) {
      return res.status(400).json({
        success: false,
        message: "Required address fields missing",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        address: {
          name,
          email,
          street,
          city,
          state,
          zip,
          country,
          phone,
        },
      },
      select: {
        address: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Address saved successfully",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Save address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save address",
    });
  }
};

export const getUserAddress = async (req:any, res:any) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { address: true },
  });

  res.json({
    success: true,
    address: user?.address || null,
  });
};


export const getOrders = async (req: any, res: any) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
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
      },
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    console.error("GET ORDERS ERROR:", e);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// export const updateProfile = async (req: any, res: any) => {
//   try {
//     // 🔐 userId should come from auth middleware, NOT body
//     const userId = (req as any).user?.userId;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const { name, phone, address, dob, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !gender) {
//       return res.status(400).json({
//         success: false,
//         message: "Data Missing",
//       });
//     }

//     // Parse address safely
//     let parsedAddress;
//     try {
//       parsedAddress = address ? JSON.parse(address) : undefined;
//     } catch {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid address format",
//       });
//     }

//     // Update profile data
//     await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         phone,
//         dob,
//         gender,
//         ...(parsedAddress && { address: parsedAddress }),
//       },
//     });

//     // Upload image if provided
//     if (imageFile) {
//       const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
//         resource_type: "image",
//       });

//       await prisma.user.update({
//         where: { id: userId },
//         data: {
//           image: uploadResult.secure_url,
//         },
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Profile Updated",
//     });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };