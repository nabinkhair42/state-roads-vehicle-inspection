import { app } from "./app";
import ENV_CONFIG from "@/config/env.config";
import { connectToDB } from "./db";
import { devLog } from "./utils/dev-log";

// app
connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(ENV_CONFIG.PORT, () => {
      console.log(`Server is running on PORT :${ENV_CONFIG.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start!");
    devLog(err);
  });
