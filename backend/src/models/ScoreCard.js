import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ScoreCardSchema = new Schema({
    name: String,
    subject: String,
    score: String
});

const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);
export default ScoreCard;