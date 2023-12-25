import { NextFunction, Request, Response } from 'express';
import { reviewValidationSchema } from './review.zod.validation';
import { reviewServices } from './review.services';

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = reviewValidationSchema.parse(req.body);
    const result = await reviewServices.createReviewIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Review created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//find best course-----------------
const getBestCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewServices.getBestCourseFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewController = {
  createReview,
  getBestCourse,
};
