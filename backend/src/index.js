import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`ERROR ::: ${error}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB Connection Failed !!! ERROR ::: ${error}`);
  });
