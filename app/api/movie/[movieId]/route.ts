import { fetchMovieDetails } from "@/lib/tmdbActions";

export async function GET(request: Request, props: { params: Promise<{ movieId: string }> }) {
  const params = await props.params;
  const { movieId } = params;

  const movieDetail = await fetchMovieDetails(movieId);

  return new Response(JSON.stringify(movieDetail), {
    status: 200,
  });
}
