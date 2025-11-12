import { render, screen } from "@testing-library/react";
import { Loading } from "./index";

describe("Loading", () => {
  it("renders spinner element", () => {
    const { container } = render(<Loading label="filmes" />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<Loading label="filmes" />);

    expect(screen.getByText("Carregando filmes...")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Loading label="filmes" />);

    const spinner = container.querySelector(".animate-spin");

    expect(spinner).toHaveClass(
      "animate-spin",
      "border-accent-primary"
    );
  });
});

