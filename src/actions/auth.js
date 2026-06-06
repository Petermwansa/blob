"use server";

import { RegisterFormSchema } from "@/lib/rules";

export const register = async (state, formData) => {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  
  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        email: formData.get("email"),
    }
  }
  console.log(confirmPassword);
};
