"use server";

import { Movie } from "@/types/Movie";
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
        genre_ids: movie.genre_ids,
      };
    });

    return movies;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMovieDetails(
  movieId: string
): Promise<Movie | undefined> {
  try {
    const res = await tmdbClient.get(`/movie/${movieId}`);

    const result = res.data;

    const movie: Movie = {
      id: result.id,
      title: result.title,
      overview: result.overview,
      poster_path: `${tmdbBaseImageUrl}${result.poster_path}`,
      genre_ids: result.genres.map(
        (genre: { id: number; name: string }) => genre.id
      ),
      release_date: result.release_date,
    };

    return movie;
  } catch (error) {
    console.log(error);
  }
}
