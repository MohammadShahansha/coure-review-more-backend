import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { courseRouter } from './app/modules/course/course.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandeler';
import { categoriesRouter } from './app/modules/category/category.routes';
import { reviewRouter } from './app/modules/review/review.routes';
import { userRegistrationRoutes } from './app/modules/userRegistration/userRegistration.routes';
import { userLoginRoutes } from './app/modules/auth/auth.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', courseRouter);
app.use('/api', categoriesRouter);
app.use('/api', reviewRouter);
app.use('/api/auth', userRegistrationRoutes);
app.use('/api/auth', userLoginRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

export default app;
