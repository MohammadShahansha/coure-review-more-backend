import { UserRegistration } from '../userRegistration/userRegistration.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserRegistration.findOne({
    username: payload?.username,
  });
  console.log(isUserExist);
  if (!isUserExist) {
    throw new Error('user not exist 1111');
  }
};

export const userLoginUserService = {
  loginUser,
};
