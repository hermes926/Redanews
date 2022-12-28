import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const GuessSchema = new Schema({
    vocabs: [ String ],
    correctCnt: Number,
    guessCnt: Number,
    date: String, 
    user_id:  { type: mongoose.Types.ObjectId, ref: 'User' },
    news_id:  { type: mongoose.Types.ObjectId, ref: 'News' },
});

const Guess = mongoose.model('Guess', GuessSchema);
export default Guess;