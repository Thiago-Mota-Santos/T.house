import type { Document } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    removedAt: {
      type: Date,
      index: true,
      default: null,

      es_indexed: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "User",
  },
);

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  removedAt: Date;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}

UserSchema.pre<User>("save", function encryptPasswordHook(next) {
  // Hash the password
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

export const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
