import { screen } from "@testing-library/react";
import { Header } from "./index";
import { renderWithProviders } from "../../../test";

jest.mock("../../search-input", () => ({
  SearchInput: ({ pathname }: { pathname: string }) => (
    <div data-testid="search-input">SearchInput: {pathname}</div>
  ),
}));

describe("Header", () => {
  it("renders navigation links (Home and Favoritos)", () => {
    renderWithProviders(<Header />, { initialEntries: ["/"] });

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /favoritos/i })
    ).toBeInTheDocument();
  });

  it("highlights active link based on pathname (/)", () => {
    renderWithProviders(<Header />, {
      initialEntries: ["/"],
    });

    const homeLink = screen.getByRole("link", { name: /home/i });

    expect(homeLink).toHaveClass("text-accent-primary");
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("highlights active link based on pathname (/favorites)", () => {
    renderWithProviders(<Header />, { initialEntries: ["/favorites"] });

    const favoritesLink = screen.getByRole("link", { name: /favoritos/i });

    expect(favoritesLink).toHaveClass("text-accent-primary");
    expect(favoritesLink).toHaveAttribute("aria-current", "page");
  });

  it("renders SearchInput component", () => {
    renderWithProviders(<Header />, { initialEntries: ["/"] });

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });
});

