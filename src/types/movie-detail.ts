import type { Movie } from "./movie";
import type { Genre } from "./genre";

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Genre[];
}

