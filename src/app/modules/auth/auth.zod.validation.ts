import { z } from 'zod';

export const createLoginUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password is required',
    }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});
