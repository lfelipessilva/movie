import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { X } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    <header className="flex justify-between items-center p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              to="/"
              className={`text-lg sm:text-2xl font-bold hover:opacity-80 ${
                pathname === "/" ? "text-accent-primary" : "text-text-primary"
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`text-lg sm:text-2xl font-bold hover:opacity-80 ${
                pathname === "/favorites"
                  ? "text-accent-primary"
                  : "text-text-primary"
              }`}
              aria-current={pathname === "/favorites" ? "page" : undefined}
            >
              Favoritos
            </Link>
          </li>
        </ul>
      </nav>
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar"
          value={q ?? ""}
          aria-label="Pesquisar filmes"
          className={`hidden sm:block w-96 p-2 pr-8 border-b border-border-primary focus:outline-none ${
            pathname === "/search" ? "border-accent-primary" : "border-border-primary"
          }`}
          onChange={handleChange}
        />
        {q && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
            type="button"
            aria-label="Limpar pesquisa"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
