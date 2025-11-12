import {  screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Error } from "./index";
import { renderWithProviders } from "../../../test";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Error", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders default title when not provided", () => {
    renderWithProviders(<Error message="Something went wrong" />);
    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    renderWithProviders(
      <Error title="Custom Error" message="Something went wrong" />
    );
    expect(screen.getByText("Custom Error")).toBeInTheDocument();
  });

  it("renders error message", () => {
    renderWithProviders(<Error message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders retry button when onRetry provided", () => {
    const onRetry = jest.fn();
    renderWithProviders(<Error message="Error" onRetry={onRetry} />);
    expect(
      screen.getByRole("button", { name: /tentar novamente/i })
    ).toBeInTheDocument();
  });

  it("does not render retry button when onRetry not provided", () => {
    renderWithProviders(<Error message="Error" />);
    expect(
      screen.queryByRole("button", { name: /tentar novamente/i })
    ).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button clicked", async () => {
    const onRetry = jest.fn();
    const user = userEvent.setup();
    renderWithProviders(<Error message="Error" onRetry={onRetry} />);
    const retryButton = screen.getByRole("button", {
      name: /tentar novamente/i,
    });
    await user.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders home button when showHomeButton is true", () => {
    renderWithProviders(
      <Error message="Error" showHomeButton={true} />
    );
    expect(
      screen.getByRole("button", { name: /voltar para home/i })
    ).toBeInTheDocument();
  });

  it("does not render home button when showHomeButton is false", () => {
    renderWithProviders(<Error message="Error" showHomeButton={false} />);
    expect(
      screen.queryByRole("button", { name: /voltar para home/i })
    ).not.toBeInTheDocument();
  });

  it("navigates to home when home button clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <Error message="Error" showHomeButton={true} />
    );
    const homeButton = screen.getByRole("button", {
      name: /voltar para home/i,
    });
    await user.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders AlertCircle icon", () => {
    const { container } = renderWithProviders(
      <Error message="Error" />
    );
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    renderWithProviders(<Error message="Error message" />);
    const errorElement = screen.getByRole("alert");
    expect(errorElement).toHaveAttribute("aria-live", "assertive");
    expect(errorElement).toHaveAttribute("aria-label", "Erro");
  });
});

