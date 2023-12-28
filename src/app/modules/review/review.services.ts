import { JwtPayload } from 'jsonwebtoken';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (review: TReview, userInfo: JwtPayload) => {
  const role = userInfo?.role;
  if (role !== 'user') {
    throw new Error('you are not auothorize');
  }
  const result = await Review.create(review);
  return result;
};

//find best course----------------
const getBestCourseFromDB = async () => {
  const bestAvarageRating = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);
  const bestCourse = await Course.findById(bestAvarageRating[0]._id).populate({
    path: 'createdBy',
    select: '-password -passwordStore',
  });
  const result = {
    course: bestCourse,
    averageRating: bestAvarageRating[0].averageRating,
    reviewCount: bestAvarageRating[0].reviewCount,
  };
  return result;
};
export const reviewServices = {
  createReviewIntoDB,
  getBestCourseFromDB,
};
