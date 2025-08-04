"use client";

import { useFavorite } from "@/contexts/FavoriteMovieContext";
import { MOVIE_GENRES } from "@/data";
import { getMovieTrailer } from "@/lib/utils";
import { Movie } from "@/types/Movie";
import {
  CheckCircle,
  ChevronDown,
  PlayCircle,
  PlusCircle,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";

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
  const parentRef = useRef<HTMLDivElement>(null);
  const [targetStyle, setTargetStyle] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const router = useRouter();

  const movieTraler = getMovieTrailer(movie.id);

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

  const handlePopup = () => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();

      setTargetStyle({
        left: rect.left,
      });
    }

    if (!!movieTraler) {
      setPlayTrailer(true);
    }
  };

  return (
    <div className="group">
      <div
        className="flex-none w-38 relative cursor-pointer group"
        ref={parentRef}
        onMouseEnter={handlePopup}
      >
        <Image
          src={movie.poster_path || ""}
          alt={movie.title}
          width={200}
          height={60}
          className="rounded-md object-cover h-auto group-hover:opacity-0 transition duration-200 delay-300"
        />
      </div>
      <div
        style={{
          ...targetStyle,
        }}
        onMouseLeave={() => setPlayTrailer(false)}
        className="absolute z-30 top-0 scale-0 bg-slate-800 transition duration-200 group-hover:scale-120 opacity-0 delay-300 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-[-2vw]"
      >
        {!!movieTraler ? (
          <ReactPlayer
            src={movieTraler.playback}
            playing={playTrailer}
            style={{ width: 330, height: "200px" }}
            muted={true}
          />
        ) : (
          <Image
            src={movie.poster_path || ""}
            alt={movie.title}
            width={230}
            height={60}
            className="object-cover"
          />
        )}
        <div className="flex justify-between p-6 items-center">
          <div className="flex space-x-3 items-center">
            <PlayCircle
              className="h-8 w-8"
              onClick={() => router.push(`/play/${movie.id}`)}
            />
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
        {/* <div className="flex items-center wrap-break-word gap-2 p-2">
          {movie.genre_ids?.map((genre, idx) => (
            <span key={idx} className="text-white text-sm">
              {MOVIE_GENRES[genre] && MOVIE_GENRES[genre]}
            </span>
          ))}
        </div> */}
      </div>
    </div>
  );
}
