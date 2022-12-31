import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TrendingNewsSchema = new Schema({
    title: String,
    article: String,
    date: String,
    link: String,
});

const TrendingNews = mongoose.model('TrendingNews', TrendingNewsSchema);
export default TrendingNews;