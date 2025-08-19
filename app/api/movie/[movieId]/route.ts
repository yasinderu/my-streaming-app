import { fetchMovieDetails } from "@/lib/tmdbActions";

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  const { movieId } = await params;

  const movieDetail = await fetchMovieDetails(movieId);

  return new Response(JSON.stringify(movieDetail), {
    status: 200,
  });
}
