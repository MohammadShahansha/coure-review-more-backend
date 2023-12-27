/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { categoryValidationSchema } from './category.zod.validation';
import { categoryServices } from './category.services';
import catchAsync from '../../utils/catchAsinc';
import { UserRegistration } from '../userRegistration/userRegistration.model';

const createCategory = catchAsync(async (req, res, next) => {
  // const zodParseData = categoryValidationSchema.parse(req.body);
  const userInfo = req.user;
  const withOutCreator = req.body;
  const findCreator = await UserRegistration.findOne({
    email: userInfo?.email,
  });
  const withCreator = {
    ...withOutCreator,
    createdBy: findCreator,
  };
  const result = await categoryServices.createCategoryIntoDB(
    req.user,
    withCreator,
  );
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res, next) => {
  const result = await categoryServices.getAllCategoryFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
};
