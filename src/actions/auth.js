"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/sessions';
import { cookies } from 'next/headers';

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


export async function login(state, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // Extract form fields
  const { email, password } = validatedFields.data;

  // Check if email exists in our DB
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({email})
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  // Check password
  const matchedPassword = await bcrypt.compare(password, existingUser.password)
  if (!matchedPassword) return { errors: { email: "Invalid credentials." } };

  // Create a session
  await createSession(existingUser._id.toString())

  console.log(existingUser);
  
  // Redirect
  redirect('/dashboard')
}


export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

