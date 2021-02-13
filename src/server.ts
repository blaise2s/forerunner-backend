import { checkEnv } from './utils';
import { mongooseDB } from './database';
import { instance } from './app';

checkEnv();
mongooseDB.connect();

const app = instance();

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
