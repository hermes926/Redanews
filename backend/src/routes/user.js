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
      res
        .status(200)
        .send({ user: { username: user.username, email: user.email } });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});

router.patch("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      if (req.body.username !== "" && req.body.username != undefined) {
        user.username = req.body.username;
      }
      if (req.body.email !== "" && req.body.email != undefined) {
        user.email = req.body.email;
      }
      await user.save();
      res.status(200).send({ message: "OK" });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});

router.post("/:id/password", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user || user.password !== req.body.orgPassword) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).send({ message: "OK" });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});



export default router;
