import express from "express";
import { userAuth } from "../middleware/auth";
import {
  createContent,
  deleteContent,
  getContentBulk,
  getContentById,
  updateContent,
} from "../controller/content";

const contentRouter = express.Router();

contentRouter.post("/", userAuth, createContent);

contentRouter.get("/", userAuth, getContentBulk);

contentRouter.get("/:id", userAuth, getContentById);

contentRouter.put("/:id", userAuth, updateContent);

contentRouter.delete("/:id", userAuth, deleteContent);



export default contentRouter;
