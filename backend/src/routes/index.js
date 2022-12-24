import { Router } from 'express';
import ScoreCardRouter from './scoreCard.js';

const router = Router();

router.use('/', ScoreCardRouter);
export default router;