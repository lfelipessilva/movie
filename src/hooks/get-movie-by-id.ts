import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../lib/axios";
import type { Movie } from "../types/movie";

export const getMovieById = async ({ id }: { id: number }) => {
  const response = await api.get<Movie>(`/movie/${id}`);

  return response.data;
};

export function useMovieById({ id }: { id: number }) {
  const { i18n } = useTranslation();
  const query = useQuery({
    queryKey: ["movie", id, i18n.language],
    queryFn: () => getMovieById({ id }),
  });

  return query;
}