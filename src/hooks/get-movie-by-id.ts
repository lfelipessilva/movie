import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { MovieDetail } from "../types/movie-detail";

const getMovieById = async ({ id }: { id: number }) => {
  const response = await api.get<MovieDetail>(`/movie/${id}`);
  console.log("response", response.data);
  return response.data;
};

export function useMovieById({ id }: { id: number }) {
  const query = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById({ id }),
  });

  return query;
}