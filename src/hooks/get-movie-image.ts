import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { imageApi } from "../lib/axios";

const getMovieImage = async ({ path, width }: { path: string | null, width: number }) => {
  if (!path) return null;

  const response = await imageApi.get<Blob>(`/w${width}${path}`, {
    responseType: "blob",
  });
  return response.data;
};

export function useMovieImage({ path, width }: { path: string | null, width: number }) {
  const query = useQuery({
    queryKey: ["movie", "image", path],
    queryFn: () => getMovieImage({ path, width }),
  });

  const url = useMemo(() => {
    if (!query.data) return null;
    return URL.createObjectURL(query.data);
  }, [query.data]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return { ...query, url };
}