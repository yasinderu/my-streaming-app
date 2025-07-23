"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/User";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signup(state: FormState, formData: FormData) {
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

  Response.redirect(new URL("/login"));
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credential.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getUser(email: string) {
  const dbClient = await clientPromise;
  const db = dbClient.db("stream-db");

  const result = await db.collection("accounts").findOne({ email });

  if (!result) return null;

  return {
    ...result,
    _id: result?._id.toString(),
  };
}
