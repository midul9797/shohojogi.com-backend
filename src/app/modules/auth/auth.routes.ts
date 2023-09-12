import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router
  .post(
    '/signup',
    validateRequest(AuthValidation.create),
    AuthController.insertIntoDB
  )
  .post(
    '/login',
    validateRequest(AuthValidation.login),
    AuthController.loginUser
  );

export const AuthRoutes = router;
