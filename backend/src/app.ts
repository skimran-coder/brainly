import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/content", contentRouter);

export default app;
