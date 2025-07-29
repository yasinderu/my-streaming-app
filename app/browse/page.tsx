"use server";

import Hero from "@/components/browse/Hero";
import MovieList from "@/components/browse/MovieList";
import NavigationMenu from "@/components/NavigationMenu";
import { FavoriteProvider } from "@/contexts/FavoriteMovieContext";
import { MOVIE_SECTION_TITLES } from "@/lib/contants";
import React from "react";

export default async function BrowseMoviePage() {
  return (
    <div>
      <NavigationMenu />
      <Hero />
      <FavoriteProvider>
        {MOVIE_SECTION_TITLES.map((sec, idx) => (
          <MovieList
            key={idx}
            sectionTitle={sec.displayText}
            queryTitle={sec.queryText}
          />
        ))}
      </FavoriteProvider>
    </div>
  );
}
