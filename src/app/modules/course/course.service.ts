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

const createCourseIntoDB = async (course: TCourse) => {
  const result = await Course.create(course);
  return result;
};

const getAllCourseFromDB = async (query: any) => {
  const filterQuery = filter(Course.find(), query);
  const sortQuery = sort(filterQuery, query);
  const paginateQuery = paginate(sortQuery, query);
  const selectedFieldQuery = field(paginateQuery, query);

  const result = await selectedFieldQuery;
  return result;
};
const updateCourseFromDB = async (id: string, courseData: Partial<TCourse>) => {
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
  });
  return result;
};
//to get all review and services
const getAllReviewWithCourseFromDB = async (id: string) => {
  const course = await Course.findById(id);
  const reviews = await Review.find({ courseId: id });
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
