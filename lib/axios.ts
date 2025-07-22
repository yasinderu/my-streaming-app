"use server";

import axios from "axios";

const TMDB_API_URL = process.env.TMDB_URL;
const TMDB_USER_TOKEN = process.env.TMDB_TOKEN;

export const tmdbClient = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_USER_TOKEN}`,
  },
});
