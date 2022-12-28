import express from 'express';
import cors from 'cors';
import db from './db.js';
import routes from './routes/index.js';
import newsAPI from './newsAPI.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

db.connect();

const port = process.env.PORT || 4000

app.listen(port, () => {
 console.log(`Server is up on port ${port}.`);
});

// newsAPI.UpdateNews();
