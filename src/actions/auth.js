"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/sessions';

export const register = async (state, formData) => {
  // here we validate the form fields
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // we check if any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // we extract the form fileds
  const { email, password } = validatedFields.data;

  // check if email is already registered
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: "Server error" } };
  }

  const exstingUser = await userCollection.findOne({ email });
  if (exstingUser) {
    return { errors: { email: "Email already in the database" } };
  }

  // we hash the password 
  const hashedPassword = await bcrypt.hash(password, 10);

  // we save in the db 
  const results = await userCollection.insertOne({ email, password: hashedPassword });

  // here we create a session 
  await createSession(results.insertedId)

  // we redirect to the dashboard 
  redirect('/dashboard');
};
