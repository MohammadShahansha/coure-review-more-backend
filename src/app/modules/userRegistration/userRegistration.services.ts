import AppError from '../../errors/appErrors';
import { TUserRegistration } from './userRegistration.interface';
import { UserRegistration } from './userRegistration.model';

const createUserRegistrationIntoDB = async (
  userRegistration: TUserRegistration,
) => {
  const isExistEmail = await UserRegistration.findOne({
    email: userRegistration.email,
  });
  const isExistUserName = await UserRegistration.findOne({
    username: userRegistration.username,
  });
  if (isExistEmail) {
    throw new AppError(404, 'Email Already Exitst');
  }
  if (isExistUserName) {
    throw new AppError(404, 'user name Already Exitst');
  }
  const result = await UserRegistration.create(userRegistration);
  return result;
};

export const userRegistrationService = {
  createUserRegistrationIntoDB,
};
