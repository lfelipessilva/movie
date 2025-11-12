import { useCallback } from "react";
import { MovieCard } from "../../components/movie/card";
import { usePopularMovies } from "../../hooks/get-popular-movies";
import { useIntersectionObserver } from "../../hooks/ui/use-intersection-observer";

export function HomePage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = usePopularMovies();

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const intersectionObserver = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasNextPage,
    rootMargin: "300px",
  });

  if (isPending) return <div>Loading...</div>;

  if (error || !data) {
    const message = error instanceof Error ? error.message : "Erro ao carregar filmes";
    return <div>Error: {message}</div>;
  }

  const movies = data.pages.flatMap((page) => page.results);

  return (
    <main>
      <div className="bg-gray-800 text-white min-h-screen">
        <div className="w-full grid grid-cols-2 gap-8 mx-auto px-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div ref={intersectionObserver} className="col-span-2 flex justify-center py-8">
            {isFetchingNextPage
              ? "Carregando mais filmes..."
              : hasNextPage
                ? "Scroll para mais filmes"
                : "Você chegou ao final da lista de filmes"}
          </div>
        </div>
      </div>
    </main>
  );
}
