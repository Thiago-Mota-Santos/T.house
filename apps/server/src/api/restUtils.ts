import { z } from "zod";
import { ValidationError } from "zod-validation-error";

interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export const validateUserApi = (apiUser: User) => {
  try {
    userSchema.parse(apiUser);
  } catch (e) {
    if (e instanceof ValidationError) {
      return {
        error: e.message,
        user: null,
      };
    }

    return {
      e,
      user: null,
    };
  }
  return {
    user: apiUser,
    error: null,
  };
};
