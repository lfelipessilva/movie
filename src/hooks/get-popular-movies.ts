import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { Movie } from "../types/movie";
import type { PaginatedResponse } from "../types/paginated-response";

const getPopularMovies = async ({ page }: { page: number }) => {
  const response = await api.get<PaginatedResponse<Movie>>("/movie/popular", {
    params: {
      page,
    },
  });

  return response.data;
};

export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ["movies", "popular"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPopularMovies({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (nextPage > lastPage.total_pages) return undefined;
      return nextPage;
    },
  });
}