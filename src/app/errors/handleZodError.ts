/* eslint-disable no-unused-expressions */
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError) => {
  const errorMessage = err.issues.map((issue: ZodIssue) => {
    return {
      errorMessage: `${issue?.path[issue.path.length - 1]} is required.`,
    };
  });
  const errorDetails = err;

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails,
  };
};
export default handleZodError;
