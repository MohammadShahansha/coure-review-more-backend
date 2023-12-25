import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createLoginUserValidationSchema } from './auth.zod.validation';
import { userLoginController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(createLoginUserValidationSchema),
  userLoginController.userLogin,
);
// router.get('/categories', categoryController.getAllCategory);

export const userLoginRoutes = router;
