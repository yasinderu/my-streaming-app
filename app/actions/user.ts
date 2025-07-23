import clientPromise from "@/lib/mongodb";
import { User } from "@/types/User";

export async function getUser(email: string): Promise<User | null> {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("stream-db");

    const result = await db.collection("accounts").findOne({ email });

    if (!result) return null;

    return {
      email: result.email,
      username: result.username,
      password: result.password,
      _id: result._id.toString(),
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
