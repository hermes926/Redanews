import e, { Router } from "express";
import Guess from "../models/Guess.js";
import User from "../models/User.js";
import News from "../models/News.js";
import today from "../utils/today.js";

const router = Router();


router.post("/login",  async (req, res) => {
    let date = today.getToday();
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser === undefined || existingUser?.password !== req.body.password){
        res.status(403).send({ error: "Username or Password not correct"});
    } else {
        let existGuess = undefined;
        for (let i = 0; i < existingUser.guesses_id.length; i += 1){
            const guess = await Guess.findById(existingUser.guesses_id[i]);
            if(guess && guess.date === date){
                existGuess = guess;
                break;
            }
        }
        if (existGuess) {
            res.status(200).send({ 
                message: 'Login Successful, Guess Exist',
                account_id: existingUser._id,
                guess_id: existGuess._id,
            });
        } else {
            const todayNews = await News.findOne({date: date});
            const newGuess = new Guess({
                vocabs: [ ],
                correctCnt: 0,
                guessCnt: 0,
                date: date, 
                win: false,
                user_id: existingUser._id,
                news_id: todayNews._id,
            })
            todayNews.guesses_id = [...todayNews.guesses_id, newGuess._id];
            existingUser.guesses_id = [...existingUser.guesses_id, newGuess._id];
            await newGuess.save();
            await existingUser.save();
            await todayNews.save();
            res.status(200).send({ 
                message: 'Login Successful, New Guess Created',
                account_id: existingUser._id,
                guess_id: newGuess._id,
            });
        }   
    }
});

router.post("/signup", async (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined || req.body.email === undefined){
        res.status(400).send({error: "Bad request"});
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser){
        res.status(400).send({error: "Username Exists"});
    } else {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({message: "User Created"});
    }
});

export default router;
