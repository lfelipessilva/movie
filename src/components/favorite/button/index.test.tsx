import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteButton } from "./index";
import { renderWithProviders } from "../../../test";

describe("FavoriteButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Full variant", () => {
    it("renders correctly with unfavorited state", () => {
      renderWithProviders(<FavoriteButton movieId={1} variant="full" />);

      expect(screen.getByText("Favorite")).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /add to favorites/i })
      ).toBeInTheDocument();
    });

    it("renders correctly with favorited state", async () => {
      const user = userEvent.setup();

      renderWithProviders(<FavoriteButton movieId={1} variant="full" />);

      const button = screen.getByRole("button");

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Remove from Favorites")).toBeInTheDocument();
      });

      expect(
        screen.getByRole("button", { name: /remove from favorites/i })
      ).toBeInTheDocument();
    });

    it("toggles favorite on click", async () => {
      const user = userEvent.setup();

      renderWithProviders(<FavoriteButton movieId={1} variant="full" />);

      const button = screen.getByRole("button");

      expect(screen.getByText("Favorite")).toBeInTheDocument();

      await user.click(button);

      expect(screen.getByText("Remove from Favorites")).toBeInTheDocument();

      await user.click(button);

      expect(screen.getByText("Favorite")).toBeInTheDocument();
    });

    it("applies correct CSS classes when favorited", async () => {
      const user = userEvent.setup();

      const { container } = renderWithProviders(
        <FavoriteButton movieId={1} variant="full" />
      );

      const button = container.querySelector("button");

      if (button) {
        await user.click(button);
        await waitFor(() => {
          expect(button).toHaveClass("bg-accent-primary");
        });
      }
    });

    it("applies correct CSS classes when unfavorited", () => {
      const { container } = renderWithProviders(
        <FavoriteButton movieId={1} variant="full" />
      );

      const button = container.querySelector("button");

      expect(button).toHaveClass("bg-surface-card");
    });
  });

  describe("Compact variant", () => {
    it("renders correctly with unfavorited state", () => {
      renderWithProviders(<FavoriteButton movieId={1} variant="compact" />);

      expect(screen.getByText("Favorite")).toBeInTheDocument();
    });

    it("renders correctly with favorited state", async () => {
      const user = userEvent.setup();

      renderWithProviders(<FavoriteButton movieId={1} variant="compact" />);

      const button = screen.getByRole("button");

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Favorited")).toBeInTheDocument();
      });
    });

    it("toggles favorite on click", async () => {
      const user = userEvent.setup();

      renderWithProviders(<FavoriteButton movieId={1} variant="compact" />);

      const button = screen.getByRole("button");

      expect(screen.getByText("Favorite")).toBeInTheDocument();

      await user.click(button);

      expect(screen.getByText("Favorited")).toBeInTheDocument();

      await user.click(button);

      expect(screen.getByText("Favorite")).toBeInTheDocument();
    });

    it("applies correct CSS classes when favorited", async () => {
      const user = userEvent.setup();

      const { container } = renderWithProviders(
        <FavoriteButton movieId={1} variant="compact" />
      );

      const button = container.querySelector("button");

      if (button) {
        await user.click(button);
        await waitFor(() => {
          expect(button).toHaveClass("bg-accent-primary");
        });
      }
    });

    it("applies correct CSS classes when unfavorited", () => {
      const { container } = renderWithProviders(
        <FavoriteButton movieId={1} variant="compact" />
      );

      const button = container.querySelector("button");

      expect(button).toHaveClass("bg-surface-card");
    });
  });

  it("renders Heart icon with correct fill class when favorited", async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <FavoriteButton movieId={1} variant="full" />
    );

    const button = screen.getByRole("button");

    await user.click(button);

    await waitFor(() => {
      const heartIcon = container.querySelector("svg");
      expect(heartIcon).toHaveClass("fill-current");
    });
  });

  it("renders Heart icon without fill class when unfavorited", () => {
    const { container } = renderWithProviders(
      <FavoriteButton movieId={1} variant="full" />
    );

    const heartIcon = container.querySelector("svg");

    expect(heartIcon).not.toHaveClass("fill-current");
  });

  it("displays correct title for compact variant", () => {
    renderWithProviders(<FavoriteButton movieId={1} variant="compact" />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("title", "Add to favorites");
  });
});
