import type { ConnectOptions } from "mongoose";
import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }

  var __MONGO_DB_NAME__: string;
  var __MONGO_URI__: string;
}

const mongooseOptions: ConnectOptions = {
  autoIndex: false,
  connectTimeoutMS: 10000,
  dbName: global.__MONGO_DB_NAME__,
};

export const connectMongoose = async (): Promise<typeof mongoose> => {
  mongoose.set("strictQuery", true);

  return mongoose.connect(global.__MONGO_URI__, mongooseOptions);
};