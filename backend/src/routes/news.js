import { Router } from "express";
import News from "../models/News.js";
import Guess from "../models/Guess.js";
import mongoose from 'mongoose';
import today from "../utils/today.js";

const router = Router();

router.get('/all/:id', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        const news = await News.findById(req.params.id);
        if (!news) {
            res.status(403).send({message: "Unauthorized"});
        } else {
            res.status(200).send({
                title: news.title,
                article: news.article,
                date: news.date,
            });
        }
    } else {
        res.status(403).send({message: "Unauthorized"});
    }
})

router.get('/today', async (req, res) => {
    let date = today.getToday();
    const news = await News.findOne({date: date});
    // if (mongoose.isValidObjectId(req.params.id)) {
    //     const news = await News.findById(req.params.id);
    if (!news) {
        res.status(403).send({message: "Unauthorized"});
    } else {
        res.status(200).send({
            title: news.title,
            article: news.article,
            date: news.date,
        });
    }
    // } else {
    //     res.status(403).send({message: "Unauthorized"});
    // }
})

router.get('/all/:id/stat', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        const news = await News.findById(req.params.id);
        if (!news) {
            res.status(403).send({message: "Unauthorized"});
        } else {
            let totalGuess = news.guesses_id.length;
            let totalGuessCnt = 0;
            let totalCorrectCnt = 0;
            for(let i = 0; i < news.guesses_id.length; i+=1){
                const nowGuess = await Guess.findById(news.guesses_id[i]);
                totalGuessCnt += nowGuess.guessCnt;
                totalCorrectCnt += nowGuess.correctCnt;
            }
            res.status(200).send({totalGuess, totalGuessCnt, totalCorrectCnt});
        }
    } else {
        res.status(403).send({message: "Unauthorized"});
    }
})



export default router;
