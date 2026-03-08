/**
 * Service for uploading images to Cloudinary using Unsigned Uploads.
 *
 * To use this, you need:
 * 1. Cloudinary Cloud Name
 * 2. Unsigned Upload Preset (created in Cloudinary Settings > Upload)
 */

const CLOUDINARY_CLOUD_NAME = "dxfnr9gf0";
const CLOUDINARY_UPLOAD_PRESET = "storezy_upload";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/mystorezy/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
