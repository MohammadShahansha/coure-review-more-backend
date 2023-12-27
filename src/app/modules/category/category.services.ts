import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';
// import { UserRegistration } from '../userRegistration/userRegistration.model';

const createCategoryIntoDB = async (
  userInfo: JwtPayload,
  category: TCategory,
) => {
  const role = userInfo?.role;
  if (role !== 'admin') {
    throw new Error('you are not authorized');
  }
  const result = await Category.create(category);
  // const findCreator = await UserRegistration.findOne({
  //   email: userInfo?.email,
  // });
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find()
    .populate('createdBy')
    .select('-password');
  const categories = {
    categories: result,
  };
  return categories;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
