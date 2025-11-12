import { screen } from "@testing-library/react";
import { SearchInput } from "./index";
import { renderWithProviders } from "../../test";

const TestWrapper = ({ pathname }: { pathname: string }) => {
  return <SearchInput pathname={pathname} />;
};

describe("SearchInput", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders input field", () => {
    renderWithProviders(<TestWrapper pathname="/" />, {
      initialEntries: ["/"],
    });
    expect(
      screen.getByRole("textbox", { name: /pesquisar filmes/i })
    ).toBeInTheDocument();
  });

  it("displays value from searchParams", () => {
    renderWithProviders(<TestWrapper pathname="/search" />, {
      initialEntries: ["/search?q=test"],
    });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("test");
  });

  it("renders clear button when q param exists", () => {
    renderWithProviders(<TestWrapper pathname="/search" />, {
      initialEntries: ["/search?q=test"],
    });

    expect(
      screen.getByRole("button", { name: /limpar pesquisa/i })
    ).toBeInTheDocument();
  });

  it("does not render clear button when q param is empty", () => {
    renderWithProviders(<TestWrapper pathname="/search" />, {
      initialEntries: ["/search"],
    });

    expect(
      screen.queryByRole("button", { name: /limpar pesquisa/i })
    ).not.toBeInTheDocument();
  });

  // it("clears search on clear button click", async () => {
  //   const user = userEvent.setup();

  //   renderWithProviders(<TestWrapper pathname="/search?q=test" />, {
  //     initialEntries: ["/search?q=test"],
  //   });

  //   const clearButton = screen.getByRole("button", {
  //     name: /Limpar pesquisa/i,
  //   });

  //   await user.click(clearButton);

  //   const input = screen.getByRole("textbox") as HTMLInputElement;

  //   await waitFor(() => {
  //     expect(input.value).toBe("");
  //   });
  // });
});
