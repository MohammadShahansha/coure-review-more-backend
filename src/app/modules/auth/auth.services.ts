import config from '../../config';
import { UserRegistration } from '../userRegistration/userRegistration.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserRegistration.isUserExistByUsername(payload?.username);
  // const userInfo = await UserRegistration.find({
  //   username: payload?.username,
  // });
  if (!user) {
    throw new Error('user not exist ');
  }

  if (
    !(await UserRegistration.isPasswordMatch(payload?.password, user.password))
  ) {
    throw new Error('password not matched');
  }

  const jswPayload = {
    // username: user.username,
    // password: user.password,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jswPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  const result = {
    user,
    token,
  };

  return result;
};

const changedPassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const user = await UserRegistration.findOne({
    email: userData?.email,
  }).select('+password');
  // console.log(user);

  if (!user) {
    throw new Error('user not exist ');
  }

  // console.log(userData);
  const isPasswordMatch = await UserRegistration.isPasswordMatch(
    payload?.currentPassword,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new Error('password not matched');
  }
  await UserRegistration.storePassword(user.email, user.password, new Date());
  for (const pass of user?.passwordStore || []) {
    const result = await bcrypt.compare(payload.newPassword, pass.password);
    console.log(result);
    if (result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Do not use old password');
    }
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await UserRegistration.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
    },
    { new: true },
  );
  return result;
};

export const userLoginUserService = {
  loginUser,
  changedPassword,
};
