"use client";

import { useFavorite } from "@/contexts/FavoriteMovieContext";
import { useMovieDetail } from "@/contexts/MovieDetailContext";
import { MOVIE_GENRES } from "@/data";
import { Movie } from "@/types/Movie";
import { CircleCheck, PlayIcon, PlusCircle, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

export default function MovieDetail() {
  const { showMovieDetail, handleShowMovieDetail, movieDetail } =
    useMovieDetail();
  const { favorite, removeMovie, addMovie } = useFavorite();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFavoriteMovie, setIsFavoriteMovie] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (movieDetail)
      if (
        favorite &&
        favorite?.movies?.find((item) => item.id === movieDetail.id)
      ) {
        setIsFavoriteMovie(true);
      } else {
        setIsFavoriteMovie(false);
      }
  }, [favorite?.movies, movieDetail]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleShowMovieDetail(false);
      }
    };

    if (showMovieDetail) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMovieDetail, handleShowMovieDetail]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleShowMovieDetail(false);
      }
    };

    if (showMovieDetail) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showMovieDetail, handleShowMovieDetail]);

  if (!showMovieDetail) return null;

  const removeMovieFromFavorite = async (movieId: string) => {
    await removeMovie(movieId);
  };

  const addToFavorite = async (movie: Movie) => {
    await addMovie(movie);
  };

  return (
    <div className="fixed bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 top-[50%] left-[50%] w-[720px] transform translate-x-[-50%] translate-y-[-50%]">
      <div
        ref={modalRef}
        className="bg-black overflow-auto h-screen text-white rounded-xl shadow-2xl max-w-4xl w-full transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
      >
        {movieDetail && (
          <div className="relative">
            <div className="relative">
              <div className="flex flex-row justify-center">
                <img
                  src={movieDetail.poster_path}
                  alt="Dexter show poster"
                  className="w-[400px] rounded-t-xl"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push(`/play/${movieDetail.id}`)}
                    className="flex items-center space-x-2 bg-white text-black font-bold py-2 px-6 rounded-sm cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <PlayIcon className="w-6 h-6" />
                    <span>Play</span>
                  </button>
                  {isFavoriteMovie ? (
                    <CircleCheck
                      className="h-10 w-10 cursor-pointer"
                      onClick={() => removeMovieFromFavorite(movieDetail.id)}
                    />
                  ) : (
                    <PlusCircle
                      className="h-10 w-10 cursor-pointer"
                      onClick={() => addToFavorite(movieDetail)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xl font-bold">
                    {movieDetail.release_date.substring(0, 4)}
                  </span>
                  <span className="border border-gray-500 text-xs px-2 py-1 rounded">
                    HD
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed">
                  {movieDetail.overview}
                </p>
              </div>
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-gray-500">
                      Genres:{" "}
                    </span>
                    <span className="text-white">
                      {movieDetail.genre_ids
                        .map(
                          /* @ts-expect-error: movie genres is match guarantee */
                          (id) => MOVIE_GENRES[id]
                        )
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleShowMovieDetail(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-gray-800 bg-opacity-70 p-2 rounded-full"
              aria-label="Close modal"
            >
              <XIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
