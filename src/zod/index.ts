import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    // matching fields
    path: ["confirmPassword"],
  });

// create schema so that we do not register wrong field
export type SignUpInterface = z.infer<typeof signUpSchema>;
