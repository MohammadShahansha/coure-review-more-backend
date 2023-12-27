/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { courseValidationSchema } from './course.zod.validation';
import { courseServices } from './course.service';
import catchAsync from '../../utils/catchAsinc';
import { UserRegistration } from '../userRegistration/userRegistration.model';

const calculateWeeksDuration = (startDate: string, endDate: string): number => {
  const startTime = Date.parse(startDate);
  const endTime = Date.parse(endDate);
  const result = Math.ceil((endTime - startTime) / (7 * 24 * 3600 * 1000));
  return result;
};
const createCourse = catchAsync(async (req, res, next) => {
  // const zodParseData = courseValidationSchema.parse(req.body);
  const userInfo = req.user;
  const courseData = req.body;
  const durationInWeeks = calculateWeeksDuration(
    courseData.startDate,
    courseData.endDate,
  );
  const findCreator = await UserRegistration.findOne({
    email: userInfo?.email,
  });
  const courseWithWeeks = {
    ...courseData,
    durationInWeeks,
    createdBy: findCreator,
  };
  const result = await courseServices.createCourseIntoDB(
    courseWithWeeks,
    userInfo,
  );
  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await courseServices.getAllCourseFromDB(req.query);
  res.status(200).json({
    success: true,
    statuCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: Number(req.query?.page) || 1,
      limit: Number(req.query?.limit) || 10,
      total: result.length,
    },
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const userInfo = req.user;
  const { courseId } = req.params;
  const courseData = req.body;
  const result = await courseServices.updateCourseFromDB(
    courseId,
    courseData,
    userInfo,
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

//get all review and related data
const getAllReviewWithCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await courseServices.getAllReviewWithCourseFromDB(courseId);
    res.status(200).json({
      success: true,
      statusCod: 200,
      message: 'Course and Reviews retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const courseController = {
  createCourse,
  getAllCourse,
  updateCourse,
  getAllReviewWithCourse,
};
