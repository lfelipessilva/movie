import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { PopularMovie } from "../types/movie";
import type { PaginatedResponse } from "../types/paginated-response";

const getMovieByQuery = async ({ q }: { q: string }) => {
  const response = await api.get<PaginatedResponse<PopularMovie>>(`/search/movie`, {
    params: {
      query: q,
    },
  });

  return response.data;
};

export function useMovieByQuery({ q }: { q: string }) {
  const query = useQuery({
    queryKey: ["movie", "search", q],
    queryFn: () => getMovieByQuery({ q }),
  });

  return query;
}