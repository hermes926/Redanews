import { Router } from "express";
import User from "../models/User.js";
import Guess from "../models/Guess.js";
import News from "../models/News.js";
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

router.get("/:id/history", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      let guesses = [];
      for (let i = 0; i < user.guesses_id.length; i++) {
        const guess = await Guess.findById(user.guesses_id[i]);
        const news = await News.findById(guess.news_id);
        if (!news) continue;

        let t = 0.0,
          cnt = 10e-7;
        for (let j = 0; j < news.guesses_id.length; j++) {
          const guess_r = await Guess.findById(news.guesses_id[j]);
          if (guess_r.win) {
            t += guess_r.correctCnt / guess_r.guessCnt;
            cnt += 1.0;
          }
        }
        const newGuess = {
          link: news.link,
          title: news.title,
          date: guess.date,
          guess_id: guess._id,
          news_id: guess.news_id,
          guessCnt: guess.guessCnt,
          correctCnt: guess.correctCnt,
          avgGuess: ((t * 100) / cnt).toFixed(2),
          win: guess.win,
        };
        guesses = [...guesses, newGuess];
      }
      res.status(200).send({
        guesses: guesses,
        username: user.username,
      });
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
        const existingUser = await User.findOne({
          username: req.body.username,
        });
        if (existingUser) {
          res.status(400).send({ error: "Username Exists" });
        }
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
