import express from "express";
import { userAuth } from "../middleware/auth";
import {
  createContent,
  deleteContent,
  getContentBulk,
  getContentById,
  patchContent,
} from "../controller/content";

const contentRouter = express.Router();

contentRouter.post("/", userAuth, createContent);

contentRouter.get("/", userAuth, getContentBulk);

contentRouter.get("/:id", userAuth, getContentById);

contentRouter.patch("/:id", userAuth, patchContent);

contentRouter.delete("/:id", userAuth, deleteContent);

export default contentRouter;
