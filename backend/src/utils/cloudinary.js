import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw  new Error("Couldn't find file");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`FILE SUCCESSFULLY UPLOADED ON CLOUDINARY`);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error(
            "Error deleting local file after upload failure",
            unlinkError
          );
        } else {
          console.log("Local file deleted due to error");
        }
      });
    }

    return null;
  }
};
