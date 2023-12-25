import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsinc';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('You are Unothorize');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new Error('you are not authorize');
        }
        req.user = decoded as JwtPayload;
      },
    );

    next();
  });
};

export default auth;
