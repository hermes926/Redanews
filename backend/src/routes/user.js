import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

router.get("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      res.status(200).send({ user });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});

export default router;
