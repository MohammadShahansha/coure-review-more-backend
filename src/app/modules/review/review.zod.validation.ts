import { z } from 'zod';

export const reviewValidationSchema = z.object({
  courseId: z.string(),
  rating: z.number(),
  review: z.string(),
});
