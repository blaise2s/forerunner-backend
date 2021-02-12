import * as bodyParser from 'body-parser';
import * as express from 'express';

import { checkEnv } from './utils';
import { mongooseDB } from './database';
import { routes } from './routes';

checkEnv();
mongooseDB.connect();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('', routes);

const port = process.env.PORT ? +process.env.PORT : 4201;
const host = process.env.HOST;
const callbackFn = (p: number) => {
  console.log(`Forerunner Backend 🚀 app started on port ${p}`);
};
console.log(`HOST: ${host ? host : 'env variable is not set'}`);
console.log(`PORT: ${port ? port : 'env variable is not set'}`);
host
  ? app.listen(port, host, () => callbackFn(port))
  : app.listen(port, () => callbackFn(port));
