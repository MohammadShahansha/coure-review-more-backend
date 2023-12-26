/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUserRegistration {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordStore?: {
    password: string;
    timestamp: Date;
  }[];
}

export interface UserRegisterModel extends Model<TUserRegistration> {
  isUserExistByUsername(usernamae: string): Promise<TUserRegistration>;
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  storePassword(
    email: string,
    password: string,
    timestamp: Date,
  ): Promise<void>;
}
