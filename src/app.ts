import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { ORIGIN_DOMAIN } from "./config";
import cors from "cors";

//create a new express application instance, and assign it to the app variable, which is used to set up the server, and to add new routes, and so on. use the oop paradime to create a new instance of the express application
const app: express.Application = express();
console.log(ORIGIN_DOMAIN);
app.use(
  cors({
    origin: ORIGIN_DOMAIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/api", taskRoutes);
export default app;
