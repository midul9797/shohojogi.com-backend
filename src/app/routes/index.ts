import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';

import { OrderRoutes } from '../modules/order/order.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },

  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/profile',
    routes: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
