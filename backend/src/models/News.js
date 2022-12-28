import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: String,
    article: String,
    date: String,
    guesses_id: [{ type: mongoose.Types.ObjectId, ref: 'Guess' }],
});

const News = mongoose.model('News', NewsSchema);
export default News;