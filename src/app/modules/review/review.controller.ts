/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { reviewValidationSchema } from './review.zod.validation';
import { reviewServices } from './review.services';
import catchAsync from '../../utils/catchAsinc';
import { UserRegistration } from '../userRegistration/userRegistration.model';

const createReview = catchAsync(async (req, res, next) => {
  // const zodParseData = reviewValidationSchema.parse(req.body);
  const userInfo = req.user;
  const review = req.body;
  const findCreator = await UserRegistration.findOne({
    email: userInfo?.email,
  });
  const reviewWithCreator = {
    ...review,
    createdBy: findCreator,
  };
  const result = await reviewServices.createReviewIntoDB(
    reviewWithCreator,
    userInfo,
  );
  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

//find best course-----------------
const getBestCourse = catchAsync(async (req, res, next) => {
  const result = await reviewServices.getBestCourseFromDB();
  console.log(result);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getBestCourse,
};
