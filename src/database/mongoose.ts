import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectionOptions: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

let testDB: MongoMemoryServer;
const initTestDB = () => {
  testDB = new MongoMemoryServer();
  return testDB.getUri();
};

const connect = async (testing = false) => {
  const uri = testing
    ? await initTestDB()
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, connectionOptions)
    .then(() => console.log('Connected to the DB'))
    .catch(() => console.log('Failed to connect to the DB'));

  return mongoose.connection;
};

const disconnect = async (testing = false) => {
  if (testing) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    await testDB.stop();
  } else return mongoose.disconnect();
};

export const mongooseDB = { connect, disconnect };
