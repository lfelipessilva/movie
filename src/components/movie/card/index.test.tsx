import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieCard } from "./index";
import {
  renderWithProviders,
  createMockPopularMovie,
} from "../../../test";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../hooks/get-movie-image", () => ({
  useMovieImage: ({ path }: { path: string | null }) => ({
    url: path ? "https://image.tmdb.org/t/p/w300/poster.jpg" : null,
    isLoading: false,
    isError: false,
  }),
}));

jest.mock("../../../hooks/ui/use-glow-effect", () => ({
  useGlowEffect: () => ({
    handleMove: jest.fn(),
    glowStyle: { background: "radial-gradient(...)" },
    setGlowRef: jest.fn(),
  }),
}));

describe("MovieCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it("renders movie title", () => {
    const movie = createMockPopularMovie({ title: "Test Movie" });

    renderWithProviders(<MovieCard movie={movie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("renders Rating component with correct props", () => {
    const movie = createMockPopularMovie({
      vote_average: 8.5,
      vote_count: 100,
    });

    renderWithProviders(<MovieCard movie={movie} />);

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("100 avaliações")).toBeInTheDocument();
  });

  it("renders movie overview", () => {
    const movie = createMockPopularMovie({
      overview: "Test overview text",
    });

    renderWithProviders(<MovieCard movie={movie} />);

    expect(screen.getByText("Test overview text")).toBeInTheDocument();
  });

  it("renders poster image when available", () => {
    const movie = createMockPopularMovie({
      poster_path: "/poster.jpg",
    });

    const { container } = renderWithProviders(<MovieCard movie={movie} />);

    const img = container.querySelector("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300/poster.jpg"
    );
    expect(img).toHaveAttribute("alt", movie.title);
  });

  it("does not render poster when poster_path is null", () => {
    const movie = createMockPopularMovie({
      poster_path: null,
    });

    const { container } = renderWithProviders(<MovieCard movie={movie} />);

    const img = container.querySelector("img");

    expect(img).toBeNull();
  });

  it("renders FavoriteButton with correct props", () => {
    const movie = createMockPopularMovie({ id: 123 });
    renderWithProviders(<MovieCard movie={movie} />);

    const favoriteButton = screen.getByRole("button", {
      name: /favoritar/i,
    });

    expect(favoriteButton).toBeInTheDocument();
  });

  it("highlights search query in title when q param exists", () => {
    const movie = createMockPopularMovie({ title: "Test Movie" });
    const { container } = renderWithProviders(<MovieCard movie={movie} />, {
      initialEntries: ["/search?q=Test"],
    });

    const title = container.querySelector("h2");

    expect(title).toBeInTheDocument();

    const highlighted = title?.querySelector(".bg-accent-primary");

    expect(highlighted).toBeInTheDocument();
  });

  it("navigates to movie detail page on click", async () => {
    const user = userEvent.setup();

    const movie = createMockPopularMovie({ id: 123 });

    const { container } = renderWithProviders(<MovieCard movie={movie} />);

    const card = container.querySelector("article");

    if (card) {
      await user.click(card);
      expect(mockNavigate).toHaveBeenCalledWith("/movie/123");
    }
  });

  it("navigates on Enter key press", async () => {

    const user = userEvent.setup();

    const movie = createMockPopularMovie({ id: 123 });

    renderWithProviders(<MovieCard movie={movie} />);

    const card = screen.getByRole("button", {
      name: /ver detalhes de/i,
    });

    card.focus();

    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/movie/123");
  });

  it("renders fallback text when overview is empty", () => {
    const movie = createMockPopularMovie({ overview: "" });
    renderWithProviders(<MovieCard movie={movie} />);
    expect(screen.getByText("Sinopse não disponível")).toBeInTheDocument();
  });
});
