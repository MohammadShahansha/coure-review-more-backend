import express from 'express';
import { courseController } from './course.controllers';
import {
  courseValidationSchema,
  updateCourseValidationSchema,
} from './course.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/course',
  validateRequest(courseValidationSchema),
  courseController.createCourse,
);
router.get('/courses', courseController.getAllCourse);
router.put(
  '/courses/:courseId',
  validateRequest(updateCourseValidationSchema),
  courseController.updateCourse,
);
router.get(
  '/courses/:courseId/reviews',
  courseController.getAllReviewWithCourse,
);

export const courseRouter = router;
