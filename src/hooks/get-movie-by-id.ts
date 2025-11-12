import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { Movie } from "../types/movie";

export const getMovieById = async ({ id }: { id: number }) => {
  const response = await api.get<Movie>(`/movie/${id}`);

  return response.data;
};

export function useMovieById({ id }: { id: number }) {
  const query = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById({ id }),
  });

  return query;
}