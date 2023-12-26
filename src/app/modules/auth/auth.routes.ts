import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  changePasswordValidationSchema,
  createLoginUserValidationSchema,
} from './auth.zod.validation';
import { userLoginController } from './auth.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/login',
  validateRequest(createLoginUserValidationSchema),
  userLoginController.userLogin,
);
router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(changePasswordValidationSchema),
  userLoginController.changePassword,
);
// router.get('/categories', categoryController.getAllCategory);

export const userLoginRoutes = router;
