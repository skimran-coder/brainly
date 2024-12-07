import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/content", contentRouter);

connectDB()
  .then(() =>
    app.listen(7777, () => console.log("Server started succesfully!"))
  )
  .catch((e) => console.log(e));
