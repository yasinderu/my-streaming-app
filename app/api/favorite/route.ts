import { addMovieToFavorite, getFavorite } from "@/app/actions/favorite";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session?.user.id as string;
  const result = await getFavorite(userId);

  return new Response(JSON.stringify({ ...result }), { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth();
  const userId = session?.user.id as string;

  const result = await addMovieToFavorite(userId, body);

  return new Response(JSON.stringify({ ...result }), {
    status: 200,
  });
}
