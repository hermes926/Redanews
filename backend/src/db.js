import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config();

export default {
    connect : () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => console.log("mongo db connection created"));
    }
}

