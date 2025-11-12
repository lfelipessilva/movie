import { useSearchParams } from "react-router";
import { FavoriteSorter } from "../../components/favorite/sorter";
import { MovieCard } from "../../components/movie/card";
import { useFavoriteMovies } from "../../hooks/get-favorite-movies";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";

export function FavoritesPage() {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") as "title" | "rating" | null;
  const order = searchParams.get("order") as "asc" | "desc" | null;

  const { movies, isLoading, hasError, refetch } =
    useFavoriteMovies({
      sortBy,
      order,
    });

  if (!hasError && !isLoading && movies.length === 0) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Nenhum filme favorito</h1>
          <p className="text-text-secondary">
            Adicione filmes aos favoritos para vê-los aqui
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <Error
        message="Ocorreu um erro ao carregar seus filmes favoritos"
        onRetry={refetch}
        showHomeButton
      />
    );
  }

  if (isLoading) {
    return <Loading label="filmes favoritos" />;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <FavoriteSorter sortBy={sortBy} order={order} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
