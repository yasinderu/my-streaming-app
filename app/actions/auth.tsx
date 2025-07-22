"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/User";
import bcrypt from "bcrypt";

export async function signup(state: FormState, formData: FormData) {
  console.log(formData);
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const dbClient = await clientPromise;
  const db = dbClient.db("stream-db");

  const { username, email, password }: User = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const result = await db.collection("accounts").insertOne(newUser);

  if (!result) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
}
