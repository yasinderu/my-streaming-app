import clientPromise from "@/lib/mongodb";
import { Profile } from "@/types/Profile";

export async function getProfiles(userId: string): Promise<Profile[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db("stream-db");
    const profiles: Profile[] = [];

    const result = db.collection("users").find({ userId });

    for await (const doc of result) {
      profiles.push({
        id: doc._id.toString(),
        name: doc.name,
        userId: userId,
        pin: doc.pin,
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
      });
    }

    return profiles;
  } catch (error) {
    console.log("Failed to fetch user profiles.", error);
    throw new Error("Failed to fetch user profiles.");
  }
}

export async function addProfile(profile: Profile): Promise<Profile | null> {
  try {
    const client = await clientPromise;
    const db = client.db("stream-db");

    const result = await db.collection("users").insertOne(profile);

    return {
      name: profile.name,
      _id: result.insertedId,
      id: result.insertedId.toString(),
      userId: profile.userId,
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    };
  } catch (error) {
    console.log("Failed to add profile.", error);
    throw new Error("Failed to add profile");
  }
}
