import { screen } from "@testing-library/react";
import { Loading } from "./index";
import { renderWithProviders } from "../../../test";

describe("Loading", () => {
  it("renders spinner element", () => {
    const { container } = renderWithProviders(<Loading label="movies" />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders label text", () => {
    renderWithProviders(<Loading label="movies" />);

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = renderWithProviders(<Loading label="movies" />);

    const spinner = container.querySelector(".animate-spin");

    expect(spinner).toHaveClass(
      "animate-spin",
      "border-accent-primary"
    );
  });
});

