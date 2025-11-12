import { screen } from "@testing-library/react";
import { Layout } from "./index";
import { renderWithProviders } from "../../test";

jest.mock("./header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

describe("Layout", () => {
  it("renders Header component", () => {
    renderWithProviders(<Layout />, {
      initialEntries: ["/"],
    });

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders Outlet component", () => {
    renderWithProviders(<Layout />, {
      initialEntries: ["/"],
    });

    const main = document.querySelector("main");

    expect(main).toBeInTheDocument();
  });

  it("renders children routes correctly", () => {
    const { container } = renderWithProviders(<Layout />, {
      initialEntries: ["/"],
    });

    const main = container.querySelector("main");

    expect(main).toBeInTheDocument();
    expect(main?.querySelector("outlet")).toBeNull();
  });
});

