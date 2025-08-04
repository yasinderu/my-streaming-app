import { MOVIE_TRAILERS } from "@/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMovieTrailer(movieId: string) {
  return MOVIE_TRAILERS.find((t) => t.id.toString() === movieId.toString());
}
