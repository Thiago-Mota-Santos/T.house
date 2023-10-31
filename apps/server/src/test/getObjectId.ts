import type { Types, Document } from "mongoose";

export declare const getObjectId: (
  target: string | Document | Types.ObjectId,
) => Types.ObjectId | null;
