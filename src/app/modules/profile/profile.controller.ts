import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';

import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await ProfileService.getProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrived successfully',
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await ProfileService.updateProfile(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
const makeAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.makeAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateProfile,
  makeAdmin,
};
