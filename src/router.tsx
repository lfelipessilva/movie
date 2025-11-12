import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { MoviePage } from "./pages/movie/id";
import { HomePage } from "./pages/home";
import { SearchPage } from "./pages/search";
import { FavoritesPage } from "./pages/favorites";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
