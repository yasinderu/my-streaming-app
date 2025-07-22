import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/User";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("stream-db");

    // const userData =
  } catch (error) {}
}
