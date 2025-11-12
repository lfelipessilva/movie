import { Rating } from "../../rating";
import type { Movie, PopularMovie } from "../../../types/movie";
import { useGlowEffect } from "../../../hooks/ui/use-glow-effect";
import { useNavigate } from "react-router";
import { useMovieImage } from "../../../hooks/get-movie-image";
import { FavoriteButton } from "../../favorite/button";

export function MovieCard({ movie }: { movie: PopularMovie | Movie}) {
  const navigate = useNavigate();
  const { handleMove, glowStyle, setGlowRef } = useGlowEffect();

  const { url: posterUrl } = useMovieImage({ path: movie.poster_path, width: 300 });

  return (
    <article
      className="relative flex flex-col sm:flex-row gap-4 p-4 rounded-md mt-24 shadow-lg bg-surface-primary cursor-pointer"
      onMouseMove={handleMove}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${movie.title}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          if (e.key === " ") {
            e.preventDefault();
          }
          navigate(`/movie/${movie.id}`);
        }
      }}
    >
      <div
        ref={setGlowRef}
        className="absolute inset-0 rounded-md pointer-events-none transition-opacity duration-300"
        style={glowStyle}
      />

      {posterUrl ? (
        <img
          className="-mt-20 w-48 h-72 rounded shadow-2xl z-10"
          src={posterUrl}
          alt={movie.title}
        />
      ) : null}

      <div className="flex flex-col gap-4 justify-between items-end z-10">
        <div>
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <Rating rating={movie.vote_average} quantity={movie.vote_count} />
          <p
            className="text-text-secondary pt-4 line-clamp-5"
            title={movie.overview}
          >
            {movie.overview || "Sinpse não disponível"}
          </p>
        </div>
        <FavoriteButton movieId={movie.id} variant="compact" />
      </div>
    </article>
  );
}
