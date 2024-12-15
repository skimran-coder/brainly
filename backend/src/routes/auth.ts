import express, { Request, Response } from "express";
import validateInput from "../middleware/validateInput";
import {
  isLoggedIn,
  logOutUser,
  signInUser,
  signUpUser,
} from "../controller/auth";
import { userAuth } from "../middleware/auth";

const authRouter = express.Router();

authRouter.post("/signup", validateInput, signUpUser);

authRouter.post("/signin", signInUser);

authRouter.post("/logout", logOutUser);

authRouter.post("/verify", userAuth, isLoggedIn);

export default authRouter;
