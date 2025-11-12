import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { imageApi } from "../lib/axios";

const getMoviePoster = async ({ path }: { path: string | null }) => {
  if (!path) return null;

  const response = await imageApi.get<Blob>(path, {
    responseType: "blob",
  });
  return response.data;
};

export function useMoviePoster({ path }: { path: string | null }) {
  const query = useQuery({
    queryKey: ["movie", "poster", path],
    queryFn: () => getMoviePoster({ path }),
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