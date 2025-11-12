import { screen } from "@testing-library/react";
import { FavoriteSorter } from "./index";
import { renderWithProviders } from "../../../test";

const TestComponent = ({
  sortBy,
  order,
}: {
  sortBy: "title" | "rating" | null;
  order: "asc" | "desc" | null;
}) => {
  return <FavoriteSorter sortBy={sortBy} order={order} />;
};

describe("FavoriteSorter", () => {
  it("renders both sort buttons (title and rating)", () => {
    renderWithProviders(<TestComponent sortBy={null} order={null} />, {
      initialEntries: ["/favorites"],
    });

    expect(screen.getByRole("button", { name: /título/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nota/i })).toBeInTheDocument();
  });

  it("initial state: no active sorting", () => {
    renderWithProviders(<TestComponent sortBy={null} order={null} />, {
      initialEntries: ["/favorites"],
    });

    const titleButton = screen.getByRole("button", { name: /título/i });
    const ratingButton = screen.getByRole("button", { name: /nota/i });

    expect(titleButton).toHaveAttribute("aria-pressed", "false");
    expect(ratingButton).toHaveAttribute("aria-pressed", "false");
  });

  it("shows correct aria-labels for title button when active desc", () => {
    renderWithProviders(<TestComponent sortBy="title" order="desc" />, {
      initialEntries: ["/favorites?sortBy=title&order=desc"],
    });

    expect(
      screen.getByRole("button", {
        name: /ordenado por título \(decrescente\)/i,
      })
    ).toBeInTheDocument();
  });

  it("shows correct aria-labels for title button when active asc", () => {
    renderWithProviders(<TestComponent sortBy="title" order="asc" />, {
      initialEntries: ["/favorites?sortBy=title&order=asc"],
    });

    expect(
      screen.getByRole("button", {
        name: /ordenado por título \(crescente\)/i,
      })
    ).toBeInTheDocument();
  });

  it("shows correct aria-labels for rating button when active desc", () => {
    renderWithProviders(<TestComponent sortBy="rating" order="desc" />, {
      initialEntries: ["/favorites?sortBy=rating&order=desc"],
    });

    expect(
      screen.getByRole("button", {
        name: /ordenado por nota \(decrescente\)/i,
      })
    ).toBeInTheDocument();
  });

  it("shows correct aria-labels for rating button when active asc", () => {
    renderWithProviders(<TestComponent sortBy="rating" order="asc" />, {
      initialEntries: ["/favorites?sortBy=rating&order=asc"],
    });

    expect(
      screen.getByRole("button", {
        name: /ordenado por nota \(crescente\)/i,
      })
    ).toBeInTheDocument();
  });

  it("applies active styling when sorted", () => {
    const { container } = renderWithProviders(
      <TestComponent sortBy="title" order="desc" />,
      { initialEntries: ["/favorites?sortBy=title&order=desc"] }
    );

    const buttons = container.querySelectorAll("button");

    const titleButton = Array.from(buttons).find((btn: Element) =>
      btn.textContent?.includes("Título")
    );

    expect(titleButton).toHaveClass("bg-accent-primary");
  });

  it("does not apply active styling when not sorted", () => {
    const { container } = renderWithProviders(
      <TestComponent sortBy={null} order={null} />,
      { initialEntries: ["/favorites"] }
    );

    const buttons = container.querySelectorAll("button");

    buttons.forEach((button) => {
      expect(button).not.toHaveClass("bg-accent-primary");
    });
  });

  it("has correct aria-pressed when active", () => {
    renderWithProviders(<TestComponent sortBy="title" order="desc" />, {
      initialEntries: ["/favorites?sortBy=title&order=desc"],
    });

    const titleButton = screen.getByRole("button", { name: /título/i });

    expect(titleButton).toHaveAttribute("aria-pressed", "true");
  });

  it("has correct aria-pressed when inactive", () => {
    renderWithProviders(<TestComponent sortBy={null} order={null} />, {
      initialEntries: ["/favorites"],
    });

    const titleButton = screen.getByRole("button", { name: /título/i });

    expect(titleButton).toHaveAttribute("aria-pressed", "false");
  });
});

