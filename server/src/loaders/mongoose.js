import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async () => {
  const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
};
