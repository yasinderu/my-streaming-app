"use client";

import { Movie } from "@/types/Movies";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MovieListProps {
  movies?: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to MYFLIX</h1>
      <p className="text-lg">
        This is a demonstration of a Netflix-like browse page
      </p>
      <div className="h-[1000px] bg-gray-800 mt-8 flex flex-wrap items-center justify-center text-gray-500 text-2xl gap-6">
        {movies?.map((movie, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{movie.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={movie.poster_path} alt={movie.title} />
              <div>{/* <p>{movie.overview}</p> */}</div>
              <p>{movie.release_date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
