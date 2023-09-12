import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router
  .post(
    '/create-category',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.create),
    CategoryController.insertIntoDB
  )
  .get('/:id', CategoryController.getSingleCategory)
  .get('/', CategoryController.getAllCategory)
  .patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.update),
    CategoryController.updateCategory
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.deleteCategory
  );

export const CategoryRoutes = router;
