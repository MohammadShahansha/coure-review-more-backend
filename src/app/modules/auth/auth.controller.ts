/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsinc';
import { userLoginUserService } from './auth.services';
const userLogin = catchAsync(async (req, res, next) => {
  const result = await userLoginUserService.loginUser(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});
export const userLoginController = {
  userLogin,
};
