
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const uploadToCloudinary = async (file, folder = "uploads") => {

  const sigRes = await fetch(backendUrl + "/api/cloudinary/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });

  const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

  // 2️⃣ Upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await uploadRes.json();

  if (!uploadRes.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return data.secure_url;
};
