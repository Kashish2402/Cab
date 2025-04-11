import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const fetchVehicleData = async (vehicleNumber) => {
  try {
    if (!vehicleNumber) throw new Error("Please provide vehicle number");

    const options = {
      method: "POST",
      url: "https://vehicle-rc-information.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      data: {
        VehicleNumber: vehicleNumber,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle data:", error.message);
    throw error;
  }
};
