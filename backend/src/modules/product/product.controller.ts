import { Request, Response } from "express";
import prisma from "../../config/prisma";
import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier"
import {razorpay} from "../../utils/razorpay"
import crypto from "crypto"

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("➡️ createProduct reached");

    const { name, description, price, stock } = req.body;
    const files = req.files as Express.Multer.File[];

    console.log("Files Count:", files?.length);

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      },
    });

    console.log("✅ Product created:", product.id);

    // ⬇️ STREAM UPLOADS TO CLOUDINARY (NO TIMEOUT)
    const uploadToCloudinary = (file: Express.Multer.File) =>
      new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            timeout: 120000, 
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!.secure_url);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

    const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    await prisma.productImage.createMany({
      data: imageUrls.map((url) => ({
        productId: product.id,
        imageUrl: url,
      })),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("❌ createProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const getProducts = async (_: Request, res: Response) => {

  try {
    const products = await prisma.product.findMany({
      include: {
        images: true
      }
    });
    res.json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch products" })
  }
};

export const updateProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, stock },
  });

  res.json(product);
};

export const deleteProduct = async (req: any, res: any) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id },
  });

  res.json({ message: "Product deleted" });
};



export const addToCart = async (req: any, res: any) => {
  try {
    const userId = (req as any).user?.userId
    const { productId, quantity } = req.body;

    console.log("userId: ", userId)
    console.log("producId: ", productId)
    console.log("quatity: ", quantity)

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or quantity",
      });
    }

    // 1. Check if product exists & has stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // 2. Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    let cartItem;

    if (existingCartItem) {
      // 3a. Update quantity
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      // 3b. Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
    }

    console.log(cartItem)

    const cartResponse = {
      productId: cartItem.productId,
      quantity: cartItem.quantity
    }

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cartResponse,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const decreaseQuantityInCart = async (req: any, res: any) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!existingCartItem) {
      return res.status(400).json({
        success: false,
        message: "Item is not in cart",
      });
    }

    // 🔥 quantity = 1 → DELETE
    if (existingCartItem.quantity === 1) {
      await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      });

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        cartResponse: {
          productId, // ✅ correct
          quantity: 0,
        },
      });
    }

    // 🔽 quantity > 1 → DECREASE
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity - 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Cart decreased",
      cartResponse: {
        productId: updatedCartItem.productId,
        quantity: updatedCartItem.quantity,
      },
    });
  } catch (error) {
    console.error("decrease cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteCart = async (req: any, res: any) => {

  try {

    const userId = req.user?.userId
    const { productId } = req.params

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!existingCartItem) {
      return res.status(400).json({
        success: false,
        message: "Item is not in cart",
      });
    }

    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartResponse: {
        productId, // ✅ correct
        quantity: 0,
      },
    });


  } catch (error) {

    console.error("decrease cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }

}


export const placeOrder = async (req: any, res: any) => {
  try {
    const userId = req.user?.userId  // from auth middleware

    // 1. Fetch cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Validate stock + calculate total
    let total = 0;

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`,
        });
      }

      total += item.product.price * item.quantity;
    }

    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
        },
      });

      await tx.orderStatusLog.create({
        data: {
          orderId: newOrder.id,
          oldStatus: "PENDING",
          newStatus: "PENDING",
          updatedBy: userId
        }
      })

      // Create order items
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.product.price,
          },
        });

        // Reduce stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false,message: "Failed to place order" });
  }
};


export const createOrder = async (req:any,res:any) => {

  const userId = req.user.userId
  console.log("UserId:  ",userId)

  const cartItems = await prisma.cartItem.findMany({
    where:{userId},
    include:{product:true}
  })

  console.log("Inside createOrder")

  if(cartItems.length === 0){
    return res.status(400).json({message:"Cart empty"})
  }

  let total = 0

  for(const item of cartItems){

    if(item.product.stock < item.quantity){
      return res.status(400).json({
        message:`Insufficient stock for ${item.product.name}`
      })
    }

    total += item.product.price * item.quantity
  }

  // create razorpay order
  console.log("Creating razorpay order")
  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR"
  })

  // create order in DB
  console.log("creating order")
  const order = await prisma.order.create({
    data:{
      userId,
      total,
      status:"PENDING",
      razorpayOrderId: razorpayOrder.id
    }
  })


  console.log("code completed")

  res.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: total
  })

  console.log("JSON Sent")
}


export const verifyPayment = async (req:any,res:any)=>{

  const {orderId,razorpay_payment_id,razorpay_signature} = req.body
  const userId = req.user.userId

  const order = await prisma.order.findUnique({
    where:{id:orderId}
  })

  const sign = order?.razorpayOrderId + "|" + razorpay_payment_id

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
    .update(sign)
    .digest("hex")

  if(expectedSign !== razorpay_signature){
    return res.status(400).json({message:"Payment verification failed"})
  }

  const cartItems = await prisma.cartItem.findMany({
    where:{userId},
    include:{product:true}
  })

  await prisma.$transaction(async(tx)=>{

    await tx.order.update({
      where:{id:orderId},
      data:{
        paymentStatus:"SUCCESS",
        status: "CONFIRMED",
        razorpayPaymentId: razorpay_payment_id
      }
    })

    for(const item of cartItems){

      await tx.orderItem.create({
        data:{
          orderId,
          productId:item.productId,
          quantity:item.quantity,
          priceCents:item.product.price
        }
      })

      await tx.product.update({
        where:{id:item.productId},
        data:{
          stock:{decrement:item.quantity}
        }
      })
    }

    await tx.cartItem.deleteMany({
      where:{userId}
    })

  })

  res.json({success:true})
}