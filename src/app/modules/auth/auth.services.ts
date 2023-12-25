import config from '../../config';
import { UserRegistration } from '../userRegistration/userRegistration.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserRegistration.isUserExistByUsername(payload?.username);
  if (!user) {
    throw new Error('user not exist ');
  }

  if (
    !(await UserRegistration.isPasswordMatch(payload?.password, user.password))
  ) {
    throw new Error('password not matched');
  }

  const jswPayload = {
    username: user.username,
    password: user.password,
    role: user.role,
  };

  const accesssToken = jwt.sign(
    jswPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return accesssToken;
};

export const userLoginUserService = {
  loginUser,
};
