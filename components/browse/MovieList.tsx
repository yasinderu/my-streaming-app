"use client";

import { Movie } from "@/types/Movies";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface MovieListProps {
  movies?: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  const [movieList, setMovieLIst] = useState<Movie[]>([]);

  useEffect(() => {
    if (movies) {
      setMovieLIst(movies);
    }
  }, [movies]);

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
      const scrollAmount = scrollRef.current.offsetWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <>
      <div className="overflow-x-hidden text-white">
        <section className="relative py-8 mt-16">
          <h2 className="text-2xl font-bold mb-4 text-white hover:text-gray-300 cursor-pointer">
            Popular
          </h2>
          <div className="relative group">
            {showLeftArrow && (
              <button
                className="absolute cursor-pointer bg-black/50 backdrop-opacity-20 left-0 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hidden group-hover:flex items-center justify-center z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={() => scrollHorizontally("left")}
              >
                <ChevronLeft className="w-20 h-20" />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-hidden scrollbar-hide space-x-2.5 relative py-2"
            >
              {movieList.map((movie: Movie, idx) => (
                <div
                  key={idx}
                  className="flex-none w-56 transform transition-transform duration-200 hover:scale-105 group relative cursor-pointer"
                >
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="rounded-md object-cover w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/50 to-transparent rounded-b-md"></div>
                </div>
              ))}
            </div>

            {showRightArrow && (
              <button
                className="absolute cursor-pointer bg-black/40 right-0 top-1/2 -translate-y-1/2 bg-none text-white p-3 rounded-full hidden group-hover:flex items-center justify-center z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={() => scrollHorizontally("right")}
              >
                <ChevronRight className="w-20 h-20" />
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
