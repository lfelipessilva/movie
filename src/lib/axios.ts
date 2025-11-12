import axios from "axios";
import i18n from "./i18n";

const getLanguageCode = () => {
  const lang = i18n.language || "en";
  return lang === "pt" ? "pt-BR" : "en-US";
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    language: getLanguageCode(),
  };
  return config;
});

export const imageApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_IMAGE_URL,
});