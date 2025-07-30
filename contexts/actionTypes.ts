import { Favorite } from "@/types/Favorite";

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
