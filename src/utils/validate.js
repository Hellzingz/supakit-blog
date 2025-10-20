// Validation schemas using Zod for type safety and robust validation
import { z } from "zod";
import axios from "axios";

/**
 * Name validation schema
 * - English characters only (letters, spaces, hyphens)
 * - Length between 4-20 characters
 * - Can have duplicates
 * Used in: UserProfile component
 */
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(4, "Name must be at least 4 characters")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z\s-]+$/, "Name must contain only English letters, spaces, and hyphens");

/**
 * Username validation schema
 * - English characters and numbers only
 * - Length between 4-15 characters
 * - No duplicates allowed
 * Used in: UserProfile component, RegisterPage
 */
export const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .min(4, "Username must be at least 4 characters")
  .max(15, "Username must be no more than 15 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers");

/**
 * Email validation schema
 * - Standard email format validation
 * - No duplicates allowed
 * Used in: UserProfile component, RegisterPage, LoginPage
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format");

/**
 * Password validation schema
 * - Length between 8-20 characters
 * - At least one letter and one number
 * Used in: ResetPassword component, RegisterPage, LoginPage
 */
export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be no more than 20 characters")
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "Password must contain at least one letter and one number");

/**
 * Password confirmation validation schema
 * - Must match the original password
 * Used in: ResetPassword component, RegisterPage
 */
export const passwordConfirmSchema = (password) => z
  .string()
  .min(1, "Please confirm your password")
  .refine((val) => val === password, "Passwords do not match");

/**
 * User profile validation schema
 * Used in: UserProfile component
 */
export const userProfileSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
});

/**
 * Reset password validation schema
 * Used in: ResetPassword component
 */
export const resetPasswordSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
  confirmNewPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
}).refine((data) => data.newPassword !== data.oldPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});

/**
 * Validate data using Zod schema
 * Returns { isValid: boolean, errors: object, data: object }
 */
export const validateData = (schema, data) => {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, errors: {}, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors, data: null };
    }
    return { isValid: false, errors: { general: "Validation error" }, data: null };
  }
};

/**
 * Check if username is available (for duplicate checking)
 * Used in: UserProfile component, RegisterPage
 */
export const checkUsernameAvailability = async (username, currentUserId = null) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/check-username?username=${username}&userId=${currentUserId || ''}`
    );
    return { isAvailable: response.data.available, message: response.data.message || "" };
  } catch (error) {
    return { isAvailable: false, message: "Error checking username availability" };
  }
};

/**
 * Check if email is available (for duplicate checking)
 * Used in: UserProfile component, RegisterPage
 */
export const checkEmailAvailability = async (email, currentUserId = null) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/check-email?email=${email}&userId=${currentUserId || ''}`
    );
    return { isAvailable: response.data.available, message: response.data.message || "" };
  } catch (error) {
    return { isAvailable: false, message: "Error checking email availability" };
  }
};


