"use server";

import Hero from "@/components/browse/Hero";
import MovieList from "@/components/browse/MovieList";
import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";
import { FavoriteProvider } from "@/contexts/FavoriteMovieContext";
import { MOVIE_SECTION_TITLES } from "@/data";
import React from "react";

export default async function BrowseMoviePage() {
  return (
    <div>
      <NavigationMenu />
      <Hero />
      <FavoriteProvider>
        {MOVIE_SECTION_TITLES.map((sec, idx) => (
          <div className="overflow-x-clip" key={idx}>
            <MovieList
              sectionTitle={sec.displayText}
              queryTitle={sec.queryText}
            />
          </div>
        ))}
      </FavoriteProvider>
      <Footer />
    </div>
  );
}
