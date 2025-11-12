import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { Movie } from "../types/movie";

const getMovieById = async ({ id }: { id: number }) => {
  const response = await api.get<Movie>(`/movie/${id}`);
  console.log("response", JSON.stringify(response.data, null, 2));

  return response.data;
};

export function useMovieById({ id }: { id: number }) {
  const query = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById({ id }),
  });

  return query;
}