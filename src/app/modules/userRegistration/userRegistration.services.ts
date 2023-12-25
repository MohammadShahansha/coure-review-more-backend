import { TUserRegistration } from './userRegistration.interface';
import { UserRegistration } from './userRegistration.model';

const createUserRegistrationIntoDB = async (
  userRegistration: TUserRegistration,
) => {
  const result = await UserRegistration.create(userRegistration);
  return result;
};

export const userRegistrationService = {
  createUserRegistrationIntoDB,
};
