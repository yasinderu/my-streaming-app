import { ObjectId } from "mongodb";
import { Movie } from "./Movie";

export interface Favorite {
  movies: Movie[];
  id: string;
  userId: string;
  _id?: ObjectId;
}
