import { NextFunction, Request, Response } from 'express';
import { categoryValidationSchema } from './category.zod.validation';
import { categoryServices } from './category.services';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = categoryValidationSchema.parse(req.body);
    const result = await categoryServices.createCategoryIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryServices.getAllCategoryFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
};
