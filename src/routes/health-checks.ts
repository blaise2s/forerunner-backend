import { Router } from 'express';

export const healthCheckRoutes = Router();

healthCheckRoutes.get('/ping', (_req, res) => res.send('pong'));
