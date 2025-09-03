"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/User";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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

  const newProfile = {
    name: username,
    pin: "",
    userId: result.insertedId.toString(),
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
  };

  const profile = await db.collection("users").insertOne(newProfile);

  if (!result) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  if (!profile) {
    return {
      message: "An error occured while creating profile",
    };
  }

  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.log(error);
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
