import express from 'express';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategory);

export const categoriesRouter = router;
