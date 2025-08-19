"use client";

import { Favorite } from "@/types/Favorite";
import { Movie } from "@/types/Movie";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useCallback,
} from "react";
import { FavoriteMovieAction } from "./actionTypes";

interface FavoriteMovieState {
  favorite: Favorite | null;
  loading: boolean;
  error: string | null;
}

interface FavoriteMovieContextType extends FavoriteMovieState {
  getFavorite: () => Promise<void>;
  addMovie: (movie: Movie) => Promise<void>;
  removeMovie: (movieId: string) => Promise<void>;
  clearError: () => void;
}

const favoriteMovieReducer = (
  state: FavoriteMovieState,
  action: FavoriteMovieAction
): FavoriteMovieState => {
  switch (action.type) {
    case "GET_FAVORITE_START":
      return { ...state, loading: true, error: null };
    case "GET_FAVORITE_SUCCESS":
      return {
        ...state,
        loading: false,
        favorite: action.payload,
        error: null,
      };
    case "GET_FAVORITE_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TO_FAVORITE_START":
      return { ...state, loading: true, error: null };
    case "ADD_TO_FAVORITE_SUCCESS":
      return {
        ...state,
        loading: false,
        favorite: action.payload,
        error: null,
      };
    case "ADD_TO_FAVORITE_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "REMOVE_FROM_FAVORITE_START":
      return { ...state, loading: true, error: null };
    case "REMOVE_FROM_FAVORITE_SUCCESS":
      return {
        ...state,
        loading: false,
        favorite: action.payload,
        error: null,
      };
    case "REMOVE_FROM_FAVORITE_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const initalState: FavoriteMovieState = {
  favorite: null,
  loading: false,
  error: null,
};

const favoriteApi = {
  getFavorite: async (): Promise<Favorite> => {
    const result = await fetch("/api/favorite", {
      method: "GET",
    });

    if (!result) {
      throw new Error("Cannot fetch user favorite movie");
    }

    const data = await result.json();

    return data;
  },
  addMovie: async (movie: Movie): Promise<Favorite> => {
    const result = await fetch("/api/favorite", {
      method: "POST",
      body: JSON.stringify({ ...movie }),
    });

    if (!result) {
      throw new Error("Cannot add movie to favorite");
    }

    return await result.json();
  },
  removeMovie: async (movieId: string): Promise<Favorite> => {
    const result = await fetch("/api/favorite/remove-movie", {
      method: "POST",
      body: JSON.stringify({
        movieId,
      }),
    });

    if (!result) {
      throw new Error("Cannot remove movie from favorite");
    }

    return await result.json();
  },
};

interface FavoriteProviderProps {
  children: ReactNode;
}

const FavoriteMovieContext = createContext<
  FavoriteMovieContextType | undefined
>(undefined);

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const [state, dispatch] = useReducer(favoriteMovieReducer, initalState);

  const getFavorite = useCallback(async (): Promise<void> => {
    dispatch({ type: "GET_FAVORITE_START" });

    try {
      const favorite = await favoriteApi.getFavorite();
      dispatch({ type: "GET_FAVORITE_SUCCESS", payload: favorite });
    } catch (error) {
      dispatch({
        type: "GET_FAVORITE_FAILED",
        payload: error instanceof Error ? error.message : "Get favorite failed",
      });
    }
  }, []);

  const addMovie = useCallback(async (movie: Movie): Promise<void> => {
    dispatch({ type: "ADD_TO_FAVORITE_START" });

    try {
      const newFavorite = await favoriteApi.addMovie(movie);
      dispatch({ type: "ADD_TO_FAVORITE_SUCCESS", payload: newFavorite });
    } catch (error) {
      dispatch({
        type: "ADD_TO_FAVORITE_FAILED",
        payload:
          error instanceof Error
            ? error.message
            : "Add movie to favorite failed",
      });
    }
  }, []);

  const removeMovie = useCallback(async (movieId: string): Promise<void> => {
    dispatch({ type: "REMOVE_FROM_FAVORITE_START" });

    try {
      const newFavorite = await favoriteApi.removeMovie(movieId);
      dispatch({ type: "REMOVE_FROM_FAVORITE_SUCCESS", payload: newFavorite });
    } catch (error) {
      dispatch({
        type: "REMOVE_FROM_FAVORITE_FAILED",
        payload:
          error instanceof Error
            ? error.message
            : "Remove movie from favorite failed",
      });
    }
  }, []);

  const clearError = useCallback((): void => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value: FavoriteMovieContextType = {
    ...state,
    getFavorite,
    addMovie,
    clearError,
    removeMovie,
  };

  return (
    <FavoriteMovieContext.Provider value={value}>
      {children}
    </FavoriteMovieContext.Provider>
  );
};

export const useFavorite = (): FavoriteMovieContextType => {
  const context = useContext(FavoriteMovieContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }

  return context;
};
