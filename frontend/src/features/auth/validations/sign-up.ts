import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type signUpFormSchema = z.infer<typeof SignUpFormSchema>;
