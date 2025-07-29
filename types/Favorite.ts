import { Movie } from "./Movies";

export interface Favorite {
  movies: Movie[];
  id: string;
  userId: string;
}
