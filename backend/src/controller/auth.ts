import { Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type requiredBodyType = {
  username?: string;
  password: string;
  email?: string;
};

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email }: requiredBodyType = req.body;

    const existingUser: requiredBodyType | null = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "user already exist",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: requiredBodyType = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!existingUser?.password) {
      res.status(400).json({
        success: false,
        message: "invalid username or password",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "invalid password",
      });
      return;
    }
    console.log("signin endpoint");

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!);

    console.log(process.env.NODE_ENV === "production");
    console.log(process.env.NODE_ENV === "production" ? "none" : "lax");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user signed in successfully",
        data: {
          username: existingUser.username,
          email: existingUser.email,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const logOutUser = (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie("token").json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
