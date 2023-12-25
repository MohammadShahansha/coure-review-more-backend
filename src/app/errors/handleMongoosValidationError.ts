import mongoose from 'mongoose';
// import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const errorDetails = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorDetails,
  };
};

export default handleMongooseValidationError;
