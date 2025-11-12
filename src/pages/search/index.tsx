import { useSearchParams } from "react-router";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div>
      Search {query}
      <input
        type="text"
        value={query || ""}
        onChange={(e) => {
          setSearchParams({ q: e.target.value }, { replace: true });
        }}
      />
    </div>
  );
}
