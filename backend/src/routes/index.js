import { Router } from 'express';
import NewsRouter from './news.js';
import AuthRouter from './auth.js';
import GuessRouter from './guess.js';
import UserRouter from './user.js';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/guess', GuessRouter);
router.use('/user', UserRouter);
router.use('/news', NewsRouter);

export default router;