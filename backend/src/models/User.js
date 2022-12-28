import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    guesses_id: [{ type: mongoose.Types.ObjectId, ref: 'Guess' }],
});

const User = mongoose.model('User', UserSchema);
export default User;