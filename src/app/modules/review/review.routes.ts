import express from 'express';
import { reviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidationSchema } from './review.zod.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/reviews',
  auth('user'),
  validateRequest(reviewValidationSchema),
  reviewController.createReview,
);
router.get('/course/best', reviewController.getBestCourse);

export const reviewRouter = router;
