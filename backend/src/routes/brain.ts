import express from "express";
import { userAuth } from "../middleware/auth";
import { fetchSharedBrain, shareBrain } from "../controller/brain";

const brainRouter = express.Router();

brainRouter.post("/share", userAuth, shareBrain);
brainRouter.get("/share/:hash", fetchSharedBrain);

export default brainRouter;
