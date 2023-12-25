import mongoose from 'mongoose';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorMessage = `${err.value} is not a valid ID! `;
  const errorDetails = err;

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails,
  };
};

export default handleCastError;
