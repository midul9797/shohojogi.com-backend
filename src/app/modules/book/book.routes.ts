import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router
  .post(
    '/create-book',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(BookValidation.create),
    BookController.insertIntoDB
  )
  .get('/:id', BookController.getSingleBook)
  .get('/category/:categoryId', BookController.getBooksByCategory)
  .get('/', BookController.getAllBook)
  .patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(BookValidation.update),
    BookController.updateBook
  )
  .delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
