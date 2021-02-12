import * as mongoose from 'mongoose';

const connect = () => {
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
  return mongoose.connection
}

const disconnect = () => {
  return mongoose.disconnect()
}

export const mongooseDB = { connect, disconnect }
