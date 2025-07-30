"use client";

import { Movie } from "@/types/Movie";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { fetchMovies } from "@/lib/tmdbActions";
import { useFavorite } from "@/contexts/FavoriteMovieContext";
interface MovieListProps {
  sectionTitle: string;
  queryTitle: string;
}

export default function MovieList({
  sectionTitle,
  queryTitle,
}: MovieListProps) {
  const [movieList, setMovieLIst] = useState<Movie[]>([]);
  const { favorite, addMovie, getFavorite, removeMovie } = useFavorite();

  useEffect(() => {
    async function getMovie(query: string) {
      const movies = await fetchMovies(query);
      if (movies) {
        setMovieLIst(movies);
      }
    }

    if (queryTitle !== "favorite") {
      getMovie(queryTitle);
    } else {
      getFavorite();
    }
  }, []);

  useEffect(() => {
    if (favorite?.movies && queryTitle === "favorite") {
      setMovieLIst(favorite.movies);
    }
  }, [favorite]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollHorizontally = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.9;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const addToFavoriteHandler = async (movieId: string) => {
    const selectedMovie = movieList.find(
      (movie) => movie.id === movieId
    ) as Movie;

    await addMovie(selectedMovie);
  };

  const removeFromFavoriteHandler = async (movieId: string) => {
    await removeMovie(movieId);
  };

  return (
    <>
      {!!movieList.length && (
        <div className="text-white">
          <section className="relative py-8 mt-16">
            <h2 className="text-2xl font-bold mb-4 text-white hover:text-gray-300 cursor-pointer ml-4">
              {sectionTitle}
            </h2>
            <div className="relative">
              {showLeftArrow && (
                <button
                  className="absolute cursor-pointer bg-gradient-to-r from-black via-black/0 left-0 top-1/2 -translate-y-1/2 text-white p-3 pr-8 h-full flex items-center justify-center z-20 transition-opacity duration-300 opacity-100"
                  onClick={() => scrollHorizontally("left")}
                >
                  <ChevronLeft className="w-20 h-20" />
                </button>
              )}

              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex px-6 space-x-2.5 relative py-2"
              >
                {movieList.map((movie: Movie, idx) => (
                  <MovieCard
                    key={idx}
                    movie={movie}
                    addToFavoriteHandler={addToFavoriteHandler}
                    removeFromFavoriteHandler={removeFromFavoriteHandler}
                  />
                ))}
              </div>

              {showRightArrow && (
                <button
                  className="absolute cursor-pointer bg-gradient-to-r via-black/70 to-black right-0 top-1/2 -translate-y-1/2 text-white p-3 pl-6 h-full flex items-center justify-center z-20 transition-opacity duration-300 opacity-100"
                  onClick={() => scrollHorizontally("right")}
                >
                  <ChevronRight className="w-20 h-20" />
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
