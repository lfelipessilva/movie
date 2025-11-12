import { useParams } from "react-router";

export function MoviePage() {
  const { id } = useParams();
  return <div>Movie {id}</div>;
}