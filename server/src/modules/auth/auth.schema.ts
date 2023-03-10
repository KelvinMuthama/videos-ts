import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password must not be longer than 64 characters"),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
