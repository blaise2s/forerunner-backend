import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import checkEnv from './check-env';
import userRoutes from './routes/user';
import tasksRoutes from './routes/tasks';

checkEnv();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('Connected to the DB'))
  .catch(() => console.log('Failed to connect to the DB'));

const app = express();
const api = '/api';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(`${api}/user`, userRoutes);
app.use(`${api}/tasks`, tasksRoutes);

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
