import express, { Request, Response } from "express";
import validateInput from "../middleware/validateInput";
import { logOutUser, signInUser, signUpUser } from "../controller/auth";

const authRouter = express.Router();

authRouter.post("/signup", validateInput, signUpUser);

authRouter.post("/signin", signInUser);

authRouter.post("/logout", logOutUser);

export default authRouter;
