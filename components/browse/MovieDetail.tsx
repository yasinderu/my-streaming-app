"use client";

import { useMovieDetail } from "@/contexts/MovieDetailContext";
import { MOVIE_GENRES } from "@/data";
import { useRef, useEffect } from "react";

export default function MovieDetail() {
  const { showMovieDetail, handleShowMovieDetail, movieDetail } =
    useMovieDetail();
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 top-[50%] left-[50%] w-[720px] transform translate-x-[-50%] translate-y-[-50%]">
      {movieDetail && (
        <div
          ref={modalRef}
          className="bg-black text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        >
          <div className="relative">
            <div className="relative">
              <img
                src="https://placehold.co/1280x720/000000/ffffff?text=DEXTER"
                alt="Dexter show poster"
                className="w-full h-auto rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 bg-opacity-70 text-white hover:bg-gray-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 bg-opacity-70 text-white hover:bg-gray-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.88 15.19 9.11 19.167 11.25 21c2.14-1.833 2.37-5.81 2.566-7.658M12 4V2m0 20v-2M12 12V6m-1-1v2m-1-1H7M15 5h-2m2 1v2M9 13h2m-2-2h2m-2-2h2m-2-2h2"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ml-auto">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 bg-opacity-70 text-white hover:bg-gray-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 00-7.072 0l-2.828 2.828a5 5 0 007.072 7.072l1.414-1.414M11.464 15.536a5 5 0 007.072 0l2.828-2.828a5 5 0 00-7.072-7.072l-1.414 1.414M4 12h16"
                      />
                    </svg>
                  </button>
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
                <p className="text-sm">
                  violence, sex, nudity, language, substances, sexual violence,
                  suicide, sexual violence references
                </p>
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
                      {movieDetail.genre_ids.map(
                        /* @ts-expect-error: movie genres is match guarantee */
                        (id) => `${MOVIE_GENRES[id]}, `
                      )}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
