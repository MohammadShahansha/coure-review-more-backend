/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUserRegistration {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserRegisterModel extends Model<TUserRegistration> {
  isUserExistByUsername(usernamae: string): Promise<TUserRegistration>;
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
