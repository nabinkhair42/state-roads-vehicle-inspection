import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "module-alias/register";
import ENV_CONFIG from "./config/env.config";
import appRouter from "./routes";

const app = express();

//middlewares
app.use(cookieParser(ENV_CONFIG.COOKIE_SECRET));
app.use(
  bodyParser.urlencoded({ limit: ENV_CONFIG.MAX_REQUEST_SIZE, extended: true })
);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes

app.get("/", (_, res) => {
  res.send({
    message: "Welcome to the API",
  });
});

app.use("/api/v1", appRouter);

export { app };
