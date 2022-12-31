import { Router } from "express";
import Guess from "../models/Guess.js";
import mongoose from 'mongoose';


const router = Router();

router.patch('/:id', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        const guess = await Guess.findById(req.params.id);
        if (!guess) {
            res.status(403).send({message: "Unauthorized"});
        } else {
            guess.vocabs = [...guess.vocabs, req.body.vocabulary];
            guess.guessCnt = guess.guessCnt + 1;
            if(req.body.correct){
                guess.correctCnt = guess.correctCnt + 1;
            }
            await guess.save();
            res.status(200).send({message: "OK"});
        }
    } else {
        res.status(403).send({message: "Unauthorized"});
    }
})

router.get('/:id', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        const guess = await Guess.findById(req.params.id);
        if (!guess) {
            res.status(403).send({message: "Unauthorized"});
        } else {
            res.status(200).send({vocabularies: guess.vocabs});
        }
    } else {
        res.status(403).send({message: "Unauthorized"});
    }
})

router.patch('/:id/win', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        const guess = await Guess.findById(req.params.id);
        if (!guess) {
            res.status(403).send({message: "Unauthorized"});
        } else {
            guess.win = true;
            await guess.save();
            res.status(200).send({message: "OK"});
        }
    } else {
        res.status(403).send({message: "Unauthorized"});
    }
})

export default router;
