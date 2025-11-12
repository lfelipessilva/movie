import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { PopularMovie } from "../types/movie";
import type { PaginatedResponse } from "../types/paginated-response";

const getMovieByQuery = async ({ page, q }: { page: number, q: string }) => {
  const response = await api.get<PaginatedResponse<PopularMovie>>(`/search/movie`, {
    params: {
      page,
      query: q,
    },
  });

  return response.data;
};

export function useMovieByQuery({ q }: { q: string }) {
  return useInfiniteQuery({
    queryKey: ["movies", "search", q],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMovieByQuery({ page: pageParam, q: q}),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (nextPage > lastPage.total_pages) return undefined;
      return nextPage;
    },
  });
}