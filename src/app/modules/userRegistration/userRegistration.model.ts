import { Schema, model } from 'mongoose';
import { TUserRegistration } from './userRegistration.interface';
const userRegistrationSchema = new Schema<TUserRegistration>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export const UserRegistration = model<TUserRegistration>(
  'UserRegistration',
  userRegistrationSchema,
);
