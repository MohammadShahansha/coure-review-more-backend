/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsinc';
import { userRegistrationService } from './userRegistration.services';
const createUserRegistration = catchAsync(async (req, res, next) => {
  const result = await userRegistrationService.createUserRegistrationIntoDB(
    req.body,
  );
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});
export const userRegistrationController = {
  createUserRegistration,
};
