import MovieList from "@/components/browse/MovieList";
import NavigationMenu from "@/components/NavigationMenu";
import { fetchMovies } from "@/lib/tmdbActions";
import React from "react";

export default async function BrowseMoviePage() {
  const movies = await fetchMovies();
  return (
    <div>
      <NavigationMenu />
      <MovieList movies={movies} />
    </div>
  );
}
