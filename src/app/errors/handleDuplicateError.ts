/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extracteMessage = match && match[1];
  const errorDetails = [
    {
      path: '',
      message: `${extracteMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Entry',
    errorDetails,
  };
};

export default handleDuplicateError;
