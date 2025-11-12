import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
  params: {
    language: "pt-BR",
  },
});

export const imageApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_IMAGE_URL,
});