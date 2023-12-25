import express from 'express';
import { reviewController } from './review.controller';
const router = express.Router();

router.post('/reviews', reviewController.createReview);
router.get('/course/best', reviewController.getBestCourse);

export const reviewRouter = router;
