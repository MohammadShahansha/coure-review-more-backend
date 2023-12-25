import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserRegistrationValidationSchema } from './userRegistration.zod.validation';
import { userRegistrationController } from './userRegistration.controller';
const router = express.Router();

router.post(
  '/register',
  validateRequest(createUserRegistrationValidationSchema),
  userRegistrationController.createUserRegistration,
);
// router.get('/categories', categoryController.getAllCategory);

export const userRegistrationRoutes = router;
