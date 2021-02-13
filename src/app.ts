import * as bodyParser from 'body-parser';
import * as express from 'express';

import { API_BASE } from './config';
import { routes } from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const instance = (base = API_BASE) => {
  return base ? app.use(base, routes) : app.use('', routes);
};
