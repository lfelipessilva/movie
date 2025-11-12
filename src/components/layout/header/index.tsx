import { Link, useLocation } from "react-router";
import { SearchInput } from "../../search-input";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
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
      <SearchInput pathname={pathname} />
    </header>
  );
}
