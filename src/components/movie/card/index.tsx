import { useMoviePoster } from "../../../hooks/get-movie-poster";
import type { Movie } from "../../../types/movie";
import { Rating } from "../../rating";

export function MovieCard({ movie }: { movie: Movie }) {
  const { url: posterUrl } = useMoviePoster({ path: movie.poster_path });

  return (
    <article className="min-w-2xl flex gap-4 p-4 rounded-md mt-24 shadow-lg bg-surface-primary">
      {posterUrl ? (
        <img
          className="-mt-20 w-48 h-72 rounded shadow-2xl"
          src={posterUrl}
          alt={movie.title}
        />
      ) : null}
      <div className="flex flex-col gap-4 justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <Rating rating={movie.vote_average} quantity={movie.vote_count} />
          <p
            className="text-text-secondary pt-4 line-clamp-5"
            title={movie.overview}
          >
            {movie.overview}
          </p>
        </div>
        <button className="w-28 bg-accent-primary hover:bg-accent-primary-hover text-white p-2 rounded-md cursor-pointer">
          Favoritar
        </button>
      </div>
    </article>
  );
}
