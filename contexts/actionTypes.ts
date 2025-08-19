import { Favorite } from "@/types/Favorite";
import { Movie } from "@/types/Movie";

export type FavoriteMovieAction =
  | { type: "GET_FAVORITE_START" }
  | { type: "GET_FAVORITE_SUCCESS"; payload: Favorite }
  | { type: "GET_FAVORITE_FAILED"; payload: string }
  | { type: "ADD_TO_FAVORITE_START" }
  | { type: "ADD_TO_FAVORITE_SUCCESS"; payload: Favorite }
  | { type: "ADD_TO_FAVORITE_FAILED"; payload: string }
  | { type: "REMOVE_FROM_FAVORITE_START" }
  | { type: "REMOVE_FROM_FAVORITE_SUCCESS"; payload: Favorite }
  | { type: "REMOVE_FROM_FAVORITE_FAILED"; payload: string }
  | { type: "CLEAR_ERROR" };

export type MovieDetailActions =
  | { type: "GET_MOVIE_DETAIL_START" }
  | { type: "GET_MOVIE_DETAIL_SUCCESS"; payload: Movie }
  | { type: "GET_MOVIE_DETAIL_FAILED"; payload: string }
  | { type: "HANDLE_SHOW_MOVIE_DETAIL"; payload: boolean }
  | { type: "CLEAR_ERROR" }
  | { type: "CLEAR_MOVIE_DETAIL" };
