import cloudinary from "../../config/cloudinary";

export const getCloudinarySignature = async (req: any, res: any) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: req.body.folder || "uploads",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
};
