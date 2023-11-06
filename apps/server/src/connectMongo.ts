import { connectDatabase } from "./mongo";

export const connectMongo = async () => {
  return connectDatabase();
};
