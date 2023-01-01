import { Router } from "express";
import News from "../models/News.js";
import Guess from "../models/Guess.js";
import TrendingNews from "../models/TrendingNews.js";
import mongoose from "mongoose";
import today from "../utils/today.js";
import newsAPI from "../newsAPI.js";

const router = Router();

router.get("/all/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      res.status(200).send({
        title: news.title,
        article: news.article,
        date: news.date,
      });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});

router.get("/trending", async (req, res) => {
  let date = today.getToday();
  let news = await TrendingNews.find({ date: date });
  if (!news || news.length === 0) {
    await newsAPI.UpdateTrendingNews();
  }

  news = await TrendingNews.find({ date: date });
  let returnNews = [news[0]];
  for (let i = 1; i < news.length; i++) {
    if (news[i].title !== returnNews[returnNews.length - 1].title) {
      returnNews.push(news[i]);
    } else {
      news[i].delete();
    }
  }
  if (!returnNews) {
    res.status(403).send({ message: "Unauthorized" });
  } else {
    res.status(200).send(returnNews);
  }
});

router.get("/today", async (req, res) => {
  let date = today.getToday();
  let news = await News.findOne({ date: date });
  if (!news) {
    await newsAPI.UpdateNews();
  }
  news = await News.findOne({ date: date });
  if (!news) {
    res.status(403).send({ message: "Unauthorized" });
  } else {
    res.status(200).send({
      title: news.title,
      article: news.article,
      date: news.date,
    });
  }
});

router.get("/all/:id/stat", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      let totalGuess = news.guesses_id.length;
      let totalGuessCnt = 0;
      let totalCorrectCnt = 0;
      for (let i = 0; i < news.guesses_id.length; i += 1) {
        const nowGuess = await Guess.findById(news.guesses_id[i]);
        totalGuessCnt += nowGuess.guessCnt;
        totalCorrectCnt += nowGuess.correctCnt;
      }
      res.status(200).send({ totalGuess, totalGuessCnt, totalCorrectCnt });
    }
  } else {
    res.status(403).send({ message: "Unauthorized" });
  }
});

export default router;
