/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// import { Query } from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import filter from '../../queryHelpers/filterQuery';
import sort from '../../queryHelpers/sortQuery';
import paginate from '../../queryHelpers/paginateQuery';
import field from '../../queryHelpers/fieldQuery';
import { Review } from '../review/review.model';
import { JwtPayload } from 'jsonwebtoken';
// import AppError from '../../errors/appErrors';

const createCourseIntoDB = async (course: TCourse, userInfo: JwtPayload) => {
  const role = userInfo?.role;
  if (role !== 'admin') {
    throw new Error('you are not authorized');
  }
  const result = await Course.create(course);
  return result;
};

const getAllCourseFromDB = async (query: any) => {
  const filterQuery = filter(Course.find(), query)
    .populate('createdBy')
    .select('-password');
  const sortQuery = sort(filterQuery, query);
  const paginateQuery = paginate(sortQuery, query);
  const selectedFieldQuery = field(paginateQuery, query);

  const result = await selectedFieldQuery;
  return result;
};
const updateCourseFromDB = async (
  id: string,
  courseData: Partial<TCourse>,
  userInfo: JwtPayload,
) => {
  const role = userInfo?.role;
  if (role !== 'admin') {
    throw new Error('you are not auothorize');
  }
  const { tags, details, ...remainingCourseData } = courseData;
  const updateTags = tags ? tags.filter((tag) => !tag.isDeleted) : undefined;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (updateTags && updateTags.length) {
    for (const [key, value] of Object.entries(updateTags)) {
      modifiedUpdateData[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdateData[`details.${key}`] = value;
    }
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  }).populate('createdBy');
  return result;
};
//to get all review and services
const getAllReviewWithCourseFromDB = async (id: string) => {
  const course = await Course.findById(id).populate('createdBy');
  const reviews = await Review.find({ courseId: id }).populate('createdBy');
  const result = {
    course,
    reviews,
  };
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseFromDB,
  getAllReviewWithCourseFromDB,
};
