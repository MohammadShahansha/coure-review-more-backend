import config from '../../config';
import { UserRegistration } from '../userRegistration/userRegistration.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
  console.log(user);

  if (!user) {
    throw new Error('user not exist ');
  }

  if (
    !(await UserRegistration.isPasswordMatch(
      payload?.currentPassword,
      user.password,
    ))
  ) {
    throw new Error('password not matched');
  }

  if (
    user?.passwordStore?.map((pass) =>
      bcrypt.compare(payload?.newPassword, pass.password),
    )
  ) {
    throw new Error('not use old password');
  }
  const currHashedPassword = await bcrypt.hash(
    payload.currentPassword,
    Number(config.bcrypt_salt_round),
  );

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );
  // console.log(userData);
  await UserRegistration.storePassword(
    user.email,
    currHashedPassword,
    new Date(),
  );

  // if (
  //   user?.passwordStore?.map((pass) =>
  //     bcrypt.compare(newHashedPassword, pass.password),
  //   )
  // ) {
  //   throw new Error('not use old password');
  // }

  const result = await UserRegistration.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
    },
  );
  return result;
};

export const userLoginUserService = {
  loginUser,
  changedPassword,
};
