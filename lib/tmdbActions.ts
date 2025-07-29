"use server";

import { Movie } from "@/types/Movies";
import { tmdbClient } from "./axios";

const tmdbBaseImageUrl = process.env.TMD_BASE_IMG_URL;

export async function fetchMovies(
  sectionTitle: string
): Promise<Movie[] | undefined> {
  try {
    const res = await tmdbClient.get(`/movie/${sectionTitle}`);

    const results = res.data.results;

    const movies: Movie[] = results.map((movie: Movie) => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: `${tmdbBaseImageUrl}${movie.poster_path}`,
        backdrop_path: `${tmdbBaseImageUrl}${movie.backdrop_path}`,
      };
    });

    return movies;
  } catch (error) {
    console.log(error);
  }
}
