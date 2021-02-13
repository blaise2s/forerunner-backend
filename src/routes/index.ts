import { Router } from 'express';

import { healthCheckRoutes } from './health-checks';
import { userRoutes } from './user';
import { tasksRoutes } from './tasks';

export const routes = Router();

const endpoints: [string, Router][] = [
  ['', healthCheckRoutes],
  ['/user', userRoutes],
  ['/tasks', tasksRoutes]
];

endpoints.forEach(endpoint => routes.use(endpoint[0], endpoint[1]));
