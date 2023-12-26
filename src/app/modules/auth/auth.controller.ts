/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsinc';
import { userLoginUserService } from './auth.services';
const userLogin = catchAsync(async (req, res, next) => {
  const result = await userLoginUserService.loginUser(req.body);
  res.status(201).json({
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  // console.log(req.user, req.body);
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await userLoginUserService.changedPassword(user, passwordData);
  res.status(201).json({
    success: true,
    statusCode: 200,
    message: 'Password changed successfully',
    data: result,
  });
});
export const userLoginController = {
  userLogin,
  changePassword,
};
