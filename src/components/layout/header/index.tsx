import { Link } from "react-router";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="text-2xl font-bold hover:opacity-80">Home</Link>
          </li>
          <li>
            <Link to="/favorites" className="text-2xl font-bold hover:opacity-80">Favoritos</Link>
          </li>
        </ul>
      </nav>
      <div>
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-96 p-2 border-b border-border-primary focus:outline-none"
        />
      </div>
    </header>
  );
}
