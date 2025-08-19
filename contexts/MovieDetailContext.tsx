"use client";

import { Movie } from "@/types/Movie";
import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  useCallback,
} from "react";
import { MovieDetailActions } from "./actionTypes";

interface MovieDetailState {
  movieDetail: Movie | null;
  showMovieDetail: boolean;
  loading: boolean;
  error: string | null;
}

interface MovieDetailContextType extends MovieDetailState {
  getMovieDetail: (movieId: string) => Promise<void>;
  handleShowMovieDetail: (isShowing: boolean) => void;
  clearMovieDetail: () => void;
  clearError: () => void;
}

const movieDetailReducer = (
  state: MovieDetailState,
  action: MovieDetailActions
): MovieDetailState => {
  switch (action.type) {
    case "GET_MOVIE_DETAIL_START":
      return {
        ...state,
        loading: true,
        movieDetail: null,
        error: null,
      };
    case "GET_MOVIE_DETAIL_SUCCESS":
      return {
        ...state,
        movieDetail: action.payload,
        loading: false,
        error: null,
      };
    case "GET_MOVIE_DETAIL_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "HANDLE_SHOW_MOVIE_DETAIL":
      return {
        ...state,
        showMovieDetail: action.payload,
      };
    case "CLEAR_MOVIE_DETAIL":
      return {
        ...state,
        movieDetail: null,
        showMovieDetail: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initalState: MovieDetailState = {
  movieDetail: null,
  loading: false,
  error: null,
  showMovieDetail: false,
};

const movieDetailApi = {
  getMovieDetail: async (movieId: string): Promise<Movie> => {
    const result = await fetch(`/api/movie/${movieId}`, {
      method: "GET",
    });

    if (!result) {
      throw new Error("Cannot fetch movie detail.");
    }

    const data = await result.json();

    return data;
  },
};

interface MovieDetailProviderProps {
  children: ReactNode;
}

const MovieDetailContext = createContext<MovieDetailContextType | undefined>(
  undefined
);

export const MovieDetailProvider = ({ children }: MovieDetailProviderProps) => {
  const [state, dispatch] = useReducer(movieDetailReducer, initalState);

  const getMovieDetail = useCallback(async (movieId: string): Promise<void> => {
    dispatch({ type: "GET_MOVIE_DETAIL_START" });

    try {
      const detail = await movieDetailApi.getMovieDetail(movieId);
      dispatch({ type: "GET_MOVIE_DETAIL_SUCCESS", payload: detail });
    } catch (error) {
      dispatch({
        type: "GET_MOVIE_DETAIL_FAILED",
        payload:
          error instanceof Error ? error.message : "Get movie detail failed.",
      });
    }
  }, []);

  const handleShowMovieDetail = useCallback((isShowing: boolean) => {
    dispatch({ type: "HANDLE_SHOW_MOVIE_DETAIL", payload: isShowing });
  }, []);

  const clearMovieDetail = useCallback(() => {
    dispatch({ type: "CLEAR_MOVIE_DETAIL" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value: MovieDetailContextType = {
    ...state,
    getMovieDetail,
    handleShowMovieDetail,
    clearMovieDetail,
    clearError,
  };

  return (
    <MovieDetailContext.Provider value={value}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export const useMovieDetail = (): MovieDetailContextType => {
  const context = useContext(MovieDetailContext);
  if (!context) {
    throw new Error("useMovieDetail must be used within MovieDetailProvider");
  }

  return context;
};
