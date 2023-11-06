import { Types } from "mongoose";
import type { Document } from "mongoose";

export const getObjectId = (target: string | Document | Types.ObjectId) => {
  if (target instanceof Types.ObjectId) {
    return new Types.ObjectId(target.toString());
  }
};
