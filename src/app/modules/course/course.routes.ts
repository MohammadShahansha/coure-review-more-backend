import express from 'express';
import { courseController } from './course.controllers';
import {
  courseValidationSchema,
  updateCourseValidationSchema,
} from './course.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/course',
  auth('admin'),
  validateRequest(courseValidationSchema),
  courseController.createCourse,
);
router.get('/courses', auth(), courseController.getAllCourse);
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
