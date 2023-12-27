import express from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidationSchema } from './category.zod.validation';

const router = express.Router();

router.post(
  '/categories',
  auth('admin'),
  validateRequest(categoryValidationSchema),
  categoryController.createCategory,
);
router.get('/categories', categoryController.getAllCategory);

export const categoriesRouter = router;
