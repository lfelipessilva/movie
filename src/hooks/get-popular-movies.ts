import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../lib/axios";
import type { PopularMovie } from "../types/movie";
import type { PaginatedResponse } from "../types/paginated-response";

const getPopularMovies = async ({ page }: { page: number }) => {
  const response = await api.get<PaginatedResponse<PopularMovie>>("/movie/popular", {
    params: {
      page,
    },
  });

  return response.data;
};

export function usePopularMovies() {
  const { i18n } = useTranslation();
  return useInfiniteQuery({
    queryKey: ["movies", "popular", i18n.language],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPopularMovies({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (nextPage > lastPage.total_pages) return undefined;
      return nextPage;
    },
  });
}