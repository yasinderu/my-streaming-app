import { removeMovieFromFavorite } from "@/app/actions/favorite";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth();
  const userId = session?.user.id as string;

  const result = await removeMovieFromFavorite(userId, body.movieId);

  return new Response(JSON.stringify({ ...result }), {
    status: 200,
  });
}
