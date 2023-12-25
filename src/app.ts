import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { courseRouter } from './app/modules/course/course.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandeler';
import { categoriesRouter } from './app/modules/category/category.routes';
import { reviewRouter } from './app/modules/review/review.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', courseRouter);
app.use('/api', categoriesRouter);
app.use('/api', reviewRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

export default app;
