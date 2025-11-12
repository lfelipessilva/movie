import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "./use-favorites";
import { getMovieById } from "./get-movie-by-id";

export function useFavoriteMovies({
  sortBy,
  order,
}: {
  sortBy: "title" | "rating" | null;
  order: "asc" | "desc" | null;
}) {
  const { favorites } = useFavorites();

  const queries = useQueries({
    queries: favorites.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovieById({ id }),
      enabled: favorites.length > 0,
    })),
  });

  const isLoading = queries.some((query) => query.isPending);
  const hasError = queries.some((query) => query.error);
  const movies = queries
    .filter((query) => query.data)
    .map((query) => query.data!);

  return {
    isLoading,
    hasError,
    movies: movies.sort((a, b) => {
      if (sortBy === "title") {
        return order === "asc"
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      } else if (sortBy === "rating") {
        return order === "asc"
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average;
      }
      return 0;
    }),
  };
}
