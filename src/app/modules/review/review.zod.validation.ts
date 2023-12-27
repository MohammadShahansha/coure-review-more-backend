import { z } from 'zod';

export const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string(),
    createdBy: z.string().optional(),
  }),
});
