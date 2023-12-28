import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';
const createCategoryIntoDB = async (
  userInfo: JwtPayload,
  category: TCategory,
) => {
  const role = userInfo?.role;
  if (role !== 'admin') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Unauthorized Access');
  }
  const result = await Category.create(category);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().populate({
    path: 'createdBy',
    select: '-password -passwordStore',
  });
  const categories = {
    categories: result,
  };
  return categories;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
