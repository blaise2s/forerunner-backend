import { Router } from 'express';

import { userRoutes } from './user';
import { tasksRoutes } from './tasks';

const api = '/api';
export const routes = Router();

const endpoints: [string, Router][] = [
  ['/user', userRoutes],
  ['/tasks', tasksRoutes]
]

endpoints.forEach(endpoint =>
  routes.use(`${api}${endpoint[0]}`, endpoint[1])
);
