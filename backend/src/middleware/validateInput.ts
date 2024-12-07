import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function validateInput(req: Request, res: Response, next: NextFunction) {
  try {
    const requiredBody = z.object({
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" })
        .regex(passwordValidation, {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
      username: z.string().nonempty({ message: "Username cannot be empty" }),
    });

    const validatedData = requiredBody.safeParse(req.body);

    if (!validatedData.success) {
      console.error(validatedData.error);
      res.status(400).json({
        success: validatedData.success,
        message: "Validation error",
        error: validatedData.error.errors,
      });
      return;
    }

    req.body = validatedData.data;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
}

export default validateInput;
