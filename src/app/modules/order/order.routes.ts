import express from 'express';

// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

router
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    OrderController.deleteOrder
  )
  .get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.getAllOrder
  )
  .post(
    '/create-order',
    auth(ENUM_USER_ROLE.CUSTOMER),
    validateRequest(OrderValidation.create),
    OrderController.createOrder
  );

export const OrderRoutes = router;
