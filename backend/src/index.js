import { connectDB } from "./db/db.js";
import app from "./app.js";


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
