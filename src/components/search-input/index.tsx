import { X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function SearchInput({ pathname }: { pathname: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      if (pathname !== "/search") {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      } else {
        setSearchParams({ q: value });
      }
    } else {
      if (pathname !== "/search") {
        navigate("/search");
      } else {
        setSearchParams({});
      }
    }
  };

  const handleClear = () => {
    setSearchParams({});
    if (pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <div className="relative w-full sm:w-96">
      <input
        type="text"
        placeholder={t("search.placeholder")}
        value={q ?? ""}
        aria-label={t("search.ariaLabel")}
        className={`w-full p-2 pr-8 border-b border-border-primary focus:outline-none ${
          pathname === "/search"
            ? "border-accent-primary"
            : "border-border-primary"
        }`}
        onChange={handleChange}
      />
      {q && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
          type="button"
          aria-label={t("search.clear")}
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
