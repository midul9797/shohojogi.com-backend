import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';

import { IUserCreate } from './auth.interface';
import { AuthService } from './auth.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDB(req.body);
  sendResponse<IUserCreate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signup Successful',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signup Successful',
    data: result,
  });
});

export const AuthController = {
  insertIntoDB,
  loginUser,
};
