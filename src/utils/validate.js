// Validation schemas using Zod for type safety and robust validation
import { z } from "zod";

// Name validation schema
export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .min(4, "Name must be at least 4 characters")
  .max(40, "Name must be no more than 40 characters")
  .regex(
    /^[a-zA-Z\s]+$/,
    "Name must contain only English letters and spaces"
  );

// Username validation schema
export const usernameSchema = z
  .string()
  .trim()
  .min(1, "Username is required")
  .min(4, "Username must be at least 4 characters")
  .max(15, "Username must be no more than 15 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers");

// Email validation schema
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email format");

// Password validation schema
export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be no more than 20 characters")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d).+$/,
    "Password must contain at least one letter and one number"
  );

// Password confirmation validation schema
export const passwordConfirmSchema = (password) =>
  z
    .string()
    .min(1, "Please confirm your password")
    .refine((val) => val === password, "Passwords do not match");

// User profile validation schema
export const userProfileSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
});

// Register validation schema
export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

//  Reset password validation schema
export const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// Validate data using Zod schema
export const validateData = (schema, data) => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { isValid: true, errors: {}, data: result.data };
  } else {
    const errors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });
    return { isValid: false, errors, data: null };
  }
};
