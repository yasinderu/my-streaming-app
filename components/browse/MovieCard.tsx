"use client";

import { useFavorite } from "@/contexts/FavoriteMovieContext";
import { Movie } from "@/types/Movie";
import {
  CheckCircle,
  ChevronDown,
  PlayCircle,
  PlusCircle,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
  addToFavoriteHandler: (movieId: string) => void;
  removeFromFavoriteHandler: (movieId: string) => void;
}

export default function MovieCard({
  movie,
  addToFavoriteHandler,
  removeFromFavoriteHandler,
}: MovieCardProps) {
  const saveToFavorite = async (id: string) => {
    addToFavoriteHandler(id);
  };
  const { favorite } = useFavorite();
  const [isFavoriteMovie, setIsFavoriteMovie] = useState<boolean>(false);

  useEffect(() => {
    if (favorite && favorite?.movies?.find((item) => item.id === movie.id)) {
      setIsFavoriteMovie(true);
    } else {
      setIsFavoriteMovie(false);
    }
  }, [favorite?.movies]);

  const removeFromFavorite = (id: string) => {
    removeFromFavoriteHandler(id);
  };

  return (
    <div className="group">
      <div className="flex-none w-36 relative cursor-pointer group">
        <Image
          src={movie.poster_path || ""}
          alt={movie.title}
          width={200}
          height={60}
          className="rounded-md object-cover h-auto group-hover:opacity-0 transition duration-200 delay-300"
        />
      </div>
      <div className="absolute z-30 top-0 scale-0 bg-slate-800 w-56 transition duration-200 group-hover:scale-140 opacity-0 delay-300 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-[3vw]">
        <Image
          src={movie.poster_path || ""}
          alt={movie.title}
          width={230}
          height={60}
          className="object-cover"
        />
        <div className="flex justify-between p-6 items-center">
          <div className="flex space-x-3 items-center">
            <PlayCircle className="h-8 w-8" />
            {isFavoriteMovie ? (
              <CheckCircle
                className="h-8 w-8 cursor-pointer"
                onClick={() => removeFromFavorite(movie.id)}
              />
            ) : (
              <PlusCircle
                className="h-8 w-8 cursor-pointer"
                onClick={() => saveToFavorite(movie.id)}
              />
            )}
            <ThumbsUp />
          </div>
          <ChevronDown />
        </div>
        <p className="px-6 py-2 text-white">Exciting · Kids · Rivalry</p>
      </div>
    </div>
  );
}
