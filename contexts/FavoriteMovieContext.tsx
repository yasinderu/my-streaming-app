"use client";

import { Favorite } from "@/types/Favorite";
import { Movie } from "@/types/Movies";
import { createContext, useContext, ReactNode, useState } from "react";

interface FavoriteMovieContextType {
  favorite: Favorite;
  // setFavoriteList?: (movieList: Movie[]) => void
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: string) => void;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

const FavoriteMovieContext = createContext<
  FavoriteMovieContextType | undefined
>(undefined);

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const initialState: Favorite = {
    id: "abc",
    userId: "def",
    movies: [],
  };
  const [favorite, setFavorite] = useState<Favorite>(initialState);

  const addMovie = (movie: Movie): void => {
    const original = { ...favorite };

    const updatedFavorite = {
      ...original,
      movies: favorite?.movies.concat(movie),
    };
    setFavorite(updatedFavorite as Favorite);
  };

  const removeMovie = (movieId: string): void => {
    const original = { ...favorite };
    const updatedFavorite = {
      ...original,
      movies: favorite.movies.filter((movie) => movie.id !== movieId),
    };

    setFavorite(updatedFavorite as Favorite);
  };

  const value: FavoriteMovieContextType = {
    addMovie,
    favorite,
    removeMovie,
  };

  return (
    <FavoriteMovieContext.Provider value={value}>
      {children}
    </FavoriteMovieContext.Provider>
  );
};

export const useFavorite = (): FavoriteMovieContextType => {
  const context = useContext(FavoriteMovieContext);
  if (!context) {
    throw new Error("useFavorite must be used within an FavoriteProvider");
  }

  return context;
};
