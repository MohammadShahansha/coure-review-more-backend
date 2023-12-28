/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TUserRegistration,
  UserRegisterModel,
} from './userRegistration.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userRegistrationSchema = new Schema<TUserRegistration, UserRegisterModel>(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
    passwordStore: [
      {
        password: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userRegistrationSchema.pre('save', async function (next) {
  const userRegister = this;
  userRegister.password = await bcrypt.hash(
    userRegister.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// userRegistrationSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
userRegistrationSchema.statics.isUserExistByUsername = async function (
  username: string,
) {
  return await UserRegistration.findOne({
    username,
  });
};

userRegistrationSchema.statics.storePassword = async function (
  email: string,
  password: string,
  timestamp: Date,
) {
  const user = await this.findOne({ email });

  if (user) {
    let newPasswords = user?.passwordStore || [];
    newPasswords.unshift({ password, timestamp });

    newPasswords = newPasswords.slice(0, 3);
    await this.findOneAndUpdate(
      { email: user.email },
      { $set: { passwordStore: newPasswords } },
    );
  }
};

userRegistrationSchema.statics.isPasswordMatch = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const UserRegistration = model<TUserRegistration, UserRegisterModel>(
  'UserRegistration',
  userRegistrationSchema,
);
