import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "./index";
import { renderWithProviders, getTestI18nInstance, resetTestI18nInstance } from "../../test";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    resetTestI18nInstance();
    const testI18n = getTestI18nInstance();
    testI18n.changeLanguage("en");
  });

  it("renders language buttons", () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(screen.getByRole("button", { name: /switch to en/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to pt/i })).toBeInTheDocument();
  });

  it("displays current language as active", () => {
    const testI18n = getTestI18nInstance();
    testI18n.changeLanguage("en");
    renderWithProviders(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", { name: /switch to en/i });
    expect(enButton).toHaveAttribute("aria-pressed", "true");
    expect(enButton).toHaveClass("bg-accent-primary");
  });

  it("switches language when button clicked", async () => {
    const user = userEvent.setup();
    const testI18n = getTestI18nInstance();
    testI18n.changeLanguage("en");
    renderWithProviders(<LanguageSwitcher />);

    const ptButton = screen.getByRole("button", { name: /switch to pt/i });
    await user.click(ptButton);

    await waitFor(() => {
      expect(testI18n.language).toBe("pt");
    });
  });

  it("updates active button when language changes", async () => {
    const user = userEvent.setup();
    const testI18n = getTestI18nInstance();
    testI18n.changeLanguage("en");

    const { rerender } = renderWithProviders(<LanguageSwitcher />);

    const ptButton = screen.getByRole("button", { name: /switch to pt/i });
    await user.click(ptButton);

    await waitFor(() => {
      expect(testI18n.language).toBe("pt");
    });

    rerender(<LanguageSwitcher />);

    const updatedPtButton = screen.getByRole("button", { name: /switch to pt/i });
    expect(updatedPtButton).toHaveAttribute("aria-pressed", "true");
  });
});

