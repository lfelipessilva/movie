import { Link, useLocation, useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
            >
              Favoritos
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <input
          type="text"
          placeholder="Pesquisar"
          className={`w-96 p-2 border-b border-border-primary focus:outline-none ${
            pathname === "/search" ? "border-accent-primary" : "border-border-primary"
          }`}
          onChange={(e) => {
            navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
          }}
        />
      </div>
    </header>
  );
}
